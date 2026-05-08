import { useEffect, useState } from 'react';
import CommentEntry from './components/CommentEntry';
import type { CommentEntryData } from './components/CommentEntry';
import { addCorazonToComentario, fetchComentariosPage } from './comments.api';
import './Comments.css';

const ITEMS_PER_PAGE = 10;
const LIKE_COOLDOWN_MS = 4 * 60 * 60 * 1000;
const LIKE_COOLDOWN_STORAGE_KEY = 'comment-like-cooldowns';
const TONES: CommentEntryData['tone'][] = ['ember', 'copper', 'graphite', 'shadow', 'stone'];

type LikeCooldownMap = Record<string, number>;

function getToneFromText(value: string): CommentEntryData['tone'] {
  const hash = Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
  return TONES[hash % TONES.length];
}

function mapCommentToEntry(comment: {
  idUsuario: string;
  idComentario: string;
  nombreUsuario: string;
  corazonesRecibidos: number;
  comentario: string;
}): CommentEntryData {
  return {
    id: comment.idComentario,
    userId: comment.idUsuario,
    author: comment.nombreUsuario.trim().replace(/\s+/g, '_').toUpperCase(),
    message: comment.comentario,
    likes: Number(comment.corazonesRecibidos ?? 0),
    tone: getToneFromText(`${comment.idUsuario}${comment.idComentario}`),
  };
}

function mergeCommentsByIds(current: CommentEntryData[], incoming: CommentEntryData[]): CommentEntryData[] {
  const seen = new Set(current.map((entry) => `${entry.id}:${entry.userId}`));
  const merged = [...current];

  for (const entry of incoming) {
    const key = `${entry.id}:${entry.userId}`;

    if (!seen.has(key)) {
      seen.add(key);
      merged.push(entry);
    }
  }

  return merged;
}

function sanitizeLikeCooldowns(cooldowns: LikeCooldownMap, now = Date.now()): LikeCooldownMap {
  return Object.fromEntries(Object.entries(cooldowns).filter(([, expiresAt]) => expiresAt > now));
}

function readStoredLikeCooldowns(): LikeCooldownMap {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const storedValue = window.localStorage.getItem(LIKE_COOLDOWN_STORAGE_KEY);

    if (!storedValue) {
      return {};
    }

    const parsed = JSON.parse(storedValue) as unknown;

    if (!parsed || typeof parsed !== 'object') {
      return {};
    }

    const normalized = Object.fromEntries(
      Object.entries(parsed).filter(([, expiresAt]) => typeof expiresAt === 'number'),
    ) as LikeCooldownMap;

    return sanitizeLikeCooldowns(normalized);
  } catch (error) {
    console.error(error);
    return {};
  }
}

function persistLikeCooldowns(cooldowns: LikeCooldownMap) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LIKE_COOLDOWN_STORAGE_KEY, JSON.stringify(sanitizeLikeCooldowns(cooldowns)));
}

function formatLikeCooldown(expiresAt: number): string {
  const remainingMs = Math.max(expiresAt - Date.now(), 0);
  const totalMinutes = Math.ceil(remainingMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes} MIN`;
  }

  if (minutes === 0) {
    return `${hours} H`;
  }

  return `${hours} H ${minutes} MIN`;
}

export default function Comments() {
  const [comments, setComments] = useState<CommentEntryData[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likingCommentIds, setLikingCommentIds] = useState<string[]>([]);
  const [likeCooldowns, setLikeCooldowns] = useState<LikeCooldownMap>({});

  useEffect(() => {
    const storedCooldowns = readStoredLikeCooldowns();
    setLikeCooldowns(storedCooldowns);
    persistLikeCooldowns(storedCooldowns);
  }, []);

  useEffect(() => {
    const activeCooldowns = sanitizeLikeCooldowns(likeCooldowns);

    if (Object.keys(activeCooldowns).length !== Object.keys(likeCooldowns).length) {
      setLikeCooldowns(activeCooldowns);
      persistLikeCooldowns(activeCooldowns);
      return;
    }

    const nextExpiration = Math.min(...Object.values(activeCooldowns));

    if (!Number.isFinite(nextExpiration)) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const refreshedCooldowns = sanitizeLikeCooldowns(readStoredLikeCooldowns());
      setLikeCooldowns(refreshedCooldowns);
      persistLikeCooldowns(refreshedCooldowns);
    }, Math.max(nextExpiration - Date.now(), 0) + 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [likeCooldowns]);

  useEffect(() => {
    let ignore = false;

    const loadInitialPage = async () => {
      setIsLoading(true);

      try {
        const response = await fetchComentariosPage(1, ITEMS_PER_PAGE);

        if (ignore) {
          return;
        }

        setComments(response.items.map(mapCommentToEntry));
        setCurrentPage(response.page);
        setTotalComments(response.totalItems);
        setHasMore(response.page < response.totalPages);
      } catch (error) {
        if (!ignore) {
          console.error(error);
          setComments([]);
          setCurrentPage(0);
          setTotalComments(0);
          setHasMore(false);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialPage();

    return () => {
      ignore = true;
    };
  }, []);

  const openCommentForm = () => {
    sessionStorage.setItem('openAboutForm', 'true');
    window.location.hash = 'about';
  };

  const handleLikeComment = async (commentId: string) => {
    const activeCooldown = likeCooldowns[commentId];

    if (likingCommentIds.includes(commentId) || (typeof activeCooldown === 'number' && activeCooldown > Date.now())) {
      return;
    }

    const previousLikes = comments.find((entry) => entry.id === commentId)?.likes ?? 0;

    setLikingCommentIds((current) => [...current, commentId]);
    setComments((current) =>
      current.map((entry) =>
        entry.id === commentId
          ? {
              ...entry,
              likes: (entry.likes ?? 0) + 1,
            }
          : entry,
      ),
    );

    try {
      const response = await addCorazonToComentario(commentId);
      setLikeCooldowns((current) => {
        const nextCooldowns = {
          ...sanitizeLikeCooldowns(current),
          [commentId]: Date.now() + LIKE_COOLDOWN_MS,
        };

        persistLikeCooldowns(nextCooldowns);
        return nextCooldowns;
      });

      setComments((current) =>
        current.map((entry) =>
          entry.id === response.comentarioId
            ? {
                ...entry,
                likes: typeof response.corazonesRecibidos === 'number'
                  ? response.corazonesRecibidos
                  : entry.likes ?? previousLikes + 1,
              }
            : entry,
        ),
      );
    } catch (error) {
      console.error(error);
      setLikeCooldowns((current) => {
        const nextCooldowns = { ...current };
        delete nextCooldowns[commentId];
        persistLikeCooldowns(nextCooldowns);
        return nextCooldowns;
      });
      setComments((current) =>
        current.map((entry) =>
          entry.id === commentId
            ? {
                ...entry,
                likes: previousLikes,
              }
            : entry,
        ),
      );
    } finally {
      setLikingCommentIds((current) => current.filter((id) => id !== commentId));
    }
  };

  const loadMoreComments = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    const nextPage = currentPage + 1;
    setIsLoading(true);

    try {
      const response = await fetchComentariosPage(nextPage, ITEMS_PER_PAGE);

      setComments((current) => mergeCommentsByIds(current, response.items.map(mapCommentToEntry)));
      setCurrentPage(response.page);
      setTotalComments(response.totalItems);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="comments-page">
      <header className="comments-mobile-topbar">
        <h1 className="comments-mobile-title">FEEDBACK_PROTOCOL</h1>
        <span className="material-symbols-outlined comments-mobile-topbar-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
          terminal
        </span>
      </header>

      <section className="comments-mobile-shell">
        <div className="comments-mobile-heading-row">
          <h2 className="comments-section-title">PAST_ENTRIES</h2>
          <span className="comments-badge comments-badge--primary">{totalComments}_UNITS</span>
        </div>

        <div className="comments-mobile-list">
          {comments.map((entry) => (
            <CommentEntry
              key={`${entry.id}:${entry.userId}`}
              entry={entry}
              mode="mobile"
              isLiking={likingCommentIds.includes(entry.id)}
              isLikeBlocked={Boolean(likeCooldowns[entry.id] && likeCooldowns[entry.id] > Date.now())}
              blockedLabel={likeCooldowns[entry.id] ? `Disponible en ${formatLikeCooldown(likeCooldowns[entry.id])}` : undefined}
              onLike={handleLikeComment}
            />
          ))}
        </div>

        <button className="comments-load-btn comments-load-btn--mobile" type="button" onClick={loadMoreComments} disabled={isLoading || !hasMore}>
          <span className="comments-load-btn-shadow" />
          <span className="comments-load-btn-face">
            {isLoading ? (
              <>
                <span className="comments-spinner" />
                CARGANDO...
              </>
            ) : hasMore ? (
              <>
                CARGAR MAS COMENTARIOS
                <span className="material-symbols-outlined">add_circle</span>
              </>
            ) : (
              'NO HAY MAS COMENTARIOS'
            )}
          </span>
        </button>

        <button className="comments-fab" type="button" aria-label="Add comment" onClick={openCommentForm}>
          <span className="comments-fab-shadow" />
          <span className="comments-fab-face">
            <span className="material-symbols-outlined">add</span>
          </span>
        </button>
      </section>

      <section className="comments-desktop-shell">
        <div className="comments-desktop-header">
          <div>
            <h2 className="comments-section-title">PAST_ENTRIES</h2>
            <div className="comments-section-underline" />
          </div>
          <span className="comments-badge comments-badge--primary">{totalComments}_UNITS</span>
        </div>

        <div className="comments-desktop-list">
          {comments.map((entry) => (
            <CommentEntry
              key={`${entry.id}:${entry.userId}`}
              entry={entry}
              mode="desktop"
              isLiking={likingCommentIds.includes(entry.id)}
              isLikeBlocked={Boolean(likeCooldowns[entry.id] && likeCooldowns[entry.id] > Date.now())}
              blockedLabel={likeCooldowns[entry.id] ? `Disponible en ${formatLikeCooldown(likeCooldowns[entry.id])}` : undefined}
              onLike={handleLikeComment}
            />
          ))}
        </div>

        <button className="comments-load-btn" type="button" onClick={loadMoreComments} disabled={isLoading || !hasMore}>
          <span className="comments-load-btn-shadow" />
          <span className="comments-load-btn-face">
            {isLoading ? (
              <>
                <span className="comments-spinner" />
                CARGANDO...
              </>
            ) : hasMore ? (
              <>
                CARGAR MAS COMENTARIOS
                <span className="material-symbols-outlined">add_circle</span>
              </>
            ) : (
              'NO HAY MAS COMENTARIOS'
            )}
          </span>
        </button>

        <button className="comments-fab comments-fab--desktop" type="button" aria-label="Add comment" onClick={openCommentForm}>
          <span className="comments-fab-shadow" />
          <span className="comments-fab-face">
            <span className="material-symbols-outlined">add</span>
          </span>
        </button>
      </section>
    </main>
  );
}
