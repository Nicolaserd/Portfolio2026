import './CommentEntry.css';

export interface CommentEntryData {
  id: string;
  userId: string;
  author: string;
  message: string;
  tone: 'ember' | 'copper' | 'graphite' | 'shadow' | 'stone';
  date?: string;
  likes?: number;
}

interface CommentEntryProps {
  entry: CommentEntryData;
  mode: 'mobile' | 'desktop';
  isLiking?: boolean;
  isLikeBlocked?: boolean;
  blockedLabel?: string;
  onLike?: (commentId: string) => void;
}

export default function CommentEntry({
  entry,
  mode,
  isLiking = false,
  isLikeBlocked = false,
  blockedLabel,
  onLike,
}: CommentEntryProps) {
  const likesCount = Number(entry.likes ?? 0);
  const initials = entry.author
    .split('_')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
  const isLocked = isLiking || isLikeBlocked;
  const isHeartActive = isLiking || isLikeBlocked;
  const likeAriaLabel = isLikeBlocked && blockedLabel
    ? `Corazon bloqueado para ${entry.author}. ${blockedLabel}`
    : `Dar corazon a ${entry.author}`;

  return (
    <article className={`comment-entry comment-entry--${mode}`}>
      <div className="comment-entry-media">
        <div className={`comment-entry-avatar comment-entry-avatar--${entry.tone}`}>
          <span>{initials}</span>
        </div>
        {mode === 'mobile' && (
          <button
            className={`comment-entry-likes comment-entry-likes--mobile${isLiking ? ' comment-entry-likes--pending' : ''}${isLikeBlocked ? ' comment-entry-likes--blocked' : ''}`}
            type="button"
            onClick={() => onLike?.(entry.id)}
            aria-disabled={isLocked}
            aria-label={likeAriaLabel}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isHeartActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            <span className="comment-entry-likes-count">{likesCount}</span>
          </button>
        )}
      </div>

      <div className="comment-entry-content">
        <div className="comment-entry-topline">
          <h3 className="comment-entry-author">{entry.author}</h3>
          {entry.date && <span className="comment-entry-time">{entry.date}</span>}
        </div>

        <p className={`comment-entry-message${mode === 'desktop' ? ' comment-entry-message--desktop' : ''}`}>
          {mode === 'desktop' ? `"${entry.message}"` : entry.message}
        </p>

        {mode === 'desktop' && (
          <div className="comment-entry-footer">
            <button
              className={`comment-entry-likes${isLiking ? ' comment-entry-likes--pending' : ''}${isLikeBlocked ? ' comment-entry-likes--blocked' : ''}`}
              type="button"
              onClick={() => onLike?.(entry.id)}
              aria-disabled={isLocked}
              aria-label={likeAriaLabel}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isHeartActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              <span className="comment-entry-likes-count">{likesCount}</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
