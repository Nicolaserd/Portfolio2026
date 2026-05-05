---
trigger: always_on
---

Arquitectura:
src/
├── components/          # Componentes generales/compartidos usados por múltiples páginas
│   └── common/          # Ej. Header, Footer, Button
├── pages/               # Páginas de la aplicación
│   └── Home/            # Ejemplo de una página
│       ├── components/  # Componentes exclusivos de la página Home
│       ├── Home.tsx     # Archivo JSX/TSX principal de la página
│       └── Home.css     # Estilos exclusivos de la página
├── styles/              # Estilos globales (variables, reset, tipografía)
│   └── index.css        
├── App.tsx              # Componente raíz y enrutamiento
└── main.tsx             # Punto de entrada
DRY:
Antes de escribir, modificar o generar cualquier código, analiza la arquitectura actual del proyecto (patrones, estructura de carpetas, dependencias y flujo de datos).

Evalúa si la funcionalidad solicitada:

Puede resolverse reutilizando componentes, módulos o servicios existentes.
Requiere extender algún componente ya implementado.
O justifica la creación de un nuevo componente.

Toda implementación debe:

Respetar la arquitectura definida (por ejemplo: separación de capas, principios SOLID, modularidad).
Mantener coherencia con el estilo y convenciones del proyecto.
Evitar duplicación de lógica (DRY).

Si detectas que la solución propuesta rompe la arquitectura o introduce deuda técnica, propone una alternativa más alineada antes de implementar.

Comentarios: solamente imortantes de funcionameinto   en fucniones  o compentetes etc, de funcionameinto en general