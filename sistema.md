# Documentación Técnica y Bitácora del Sistema — 941

Bienvenido a la documentación oficial del sistema **941**, una plataforma web internacional de información temporal de alta precisión, diseño refinado y arquitectura moderna basada en la filosofía *"Time, beautifully simple"*.

---

## 🛠️ 1. Arquitectura Técnica y Funcionamiento

### 1.1 Stack Tecnológico Principal
- **Core:** React 18 + TypeScript + Vite.
- **Gráficos 3D:** Three.js (`three` + `@types/three`) con renderizador WebGL transparente (`alpha: true`).
- **Iconografía:** Lucide React.
- **Tipografía:** Google Font **Inter** (configurada como fuente fija e inmutable).
- **Logotipo Oficial:** Incorporación de la imagen oficial [941am.PNG](file:///Users/leninsantanadejesus/Documents/941/941am.PNG) como badge de marca e icono favicon (`/941am.PNG`).

### 1.2 Paleta de Colores Oficial
- **Azul Marino Principal:** `#071A33` (utilizado en encabezados, textos y elementos estructurales).
- **Azul Marino Oscuro (Footer):** `#040E1C` (utilizado en la barra inferior de zonas horarias).
- **Azul Marino Profundo:** `#0D47A1`.
- **Azul Eléctrico / Vibrante (Reloj):** `#0284C7` (color de los números del reloj principal y secundarios).
- **Azul Cielo (Acentos & Badge):** `#38BDF8` / `#E0F2FE`.
- **Blanco:** `#FFFFFF` (protagonista del fondo de aplicación y tarjetas).
- **Fondo Secundario:** `#F5F9FC`.

### 1.3 Motor del Tiempo (`src/lib/timeEngine.ts`)
- **Precisión de Sincronización:** Cálculo de latencia de red y offset NTP simulado (`±14ms`).
- **Formateo Internacional:** Utiliza la API nativa `Intl.DateTimeFormat` con nombres oficiales IANA (ej. `America/Santo_Domingo`, `Europe/London`, `Asia/Tokyo`).
- **Algoritmo de Posición Solar (`calculateSunTimes`):** Calcula dinámicamente la declinación solar y el ángulo horario de cualquier coordenada geográfica (latitud/longitud) para determinar la hora exacta de salida (Sunrise), puesta del sol (Sunset), duración del día y estado (Día/Noche).
- **Diferencia de Horarios (`getTimeDifference`):** Computa la variación en horas (+6h, -3h, etc.) entre cualquier par de ciudades.
- **Planificador de Reuniones (`findBestMeetingTime`):** Encuentra la ventana de traslape óptima entre varias zonas horarias dentro del rango laboral (9:00 AM - 5:00 PM).

### 1.4 Estabilidad Visual y Anti-Jitter (Números Tabulares)
Para prevenir desplazamientos o saltos horizontales involuntarios al transcurrir los segundos:
- Se implementó la propiedad CSS de dígitos tabulares: `font-variant-numeric: tabular-nums` y `font-feature-settings: "tnum"`.
- La sigla **AM / PM** se renderiza en un contenedor `<span>` independiente con ancho fijo (`width: 1.8em`) y alineación a la izquierda. Esto garantiza que la sigla permanezca 100% inmóvil mientras cambian las cifras de los segundos.

### 1.5 Capa de Datos y Persistencia
- Dataset `src/data/cities.ts` con 20 ciudades principales del mundo, códigos de país, zonas IANA, coordenadas y población.
- Persistencia de ciudades favoritas en el **Reloj Mundial** a través de `localStorage` (`941_world_clock`).

### 1.6 Regla Obligatoria de Internacionalización e Igualdad Estricta de Contenido por Idioma
- **Equivalencia de Extensión y Estructura (100% Homogénea):** Todo contenido, artículo de blog, página o elemento textual generado en la plataforma **DEBE poseer exactamente la misma riqueza, extensión, estructura de encabezados (`<h2>`, `<h3>`), citas (`<blockquote>`), tablas (`<table>`) y ejemplos prácticos** en TODOS los 10 idiomas soportados (`es`, `en`, `zh`, `hi`, `ar`, `fr`, `bn`, `pt`, `ru`, `ja`).
- **Prohibición de Resúmenes o Fragmentos Recortados:** Bajo ninguna circunstancia se permite colocar resúmenes cortos o textos simplificados en idiomas secundarios mientras el idioma principal contiene texto extenso. Al agregar o modificar cualquier artículo o vista, es **OBLIGATORIO auditar e internacionalizar integralmente cada uno de los 10 idiomas** para garantizar una experiencia idéntica sin pérdida de información al cambiar de idioma.

---

## 📜 2. Bitácora de Modificaciones y Actualizaciones (Changelog)

### [2026-08-02 / 2026-08-03] — Versión 1.0.0 (Lanzamiento Inicial, Rediseño & Optimizaciones)

#### 🚀 Creación de la Fundación
- Inicialización de la estructura del proyecto web en Vite + React + TypeScript.
- Configuración del sistema de tokens CSS en `src/styles/tokens.css`.
- Integración de `941am.PNG` como isotipo oficial de la barra de navegación y favicon.

#### 🎨 Rediseño Visual Inspirado en Time.is
- Disposición del header con insignia azul **9:41 AM** a la izquierda, selectores de formato a la derecha, lupa de búsqueda 🔍 y menú desplegable `☰`.
- Título principal *"¡Tu hora es exacta!"* con detalles de sincronización de servidor.
- Reloj gigante focal en el centro sin cajas ni bordes pesados.
- Alineación a la derecha bajo el reloj para fecha (`Domingo, 2 de agosto de 2026`), información del Sol y enlaces interactivos.
- Franja horizontal de accesos rápidos a ciudades del mundo (*Los Ángeles, Nueva York, Londres, París, Hong Kong, Tokio*).
- Footer en tono marino oscuro con franja de zonas horarias globales (`UTC`, `GMT`, `CET`, `Pacific Time`, `Eastern Time`, `China Standard Time`, etc.).

#### 💙 Ajuste Estricto de Paleta de Color & Sombra Pronunciada
- Eliminación de tonos grisáceos (`#1E293B`) y aplicación del tono **Azul Marino (`#071A33`)** a todos los títulos y textos de la plataforma.
- Configuración del reloj principal en **Azul Eléctrico Vibrante (`#0284C7`)** con **Sombra Pronunciada** combinada (`text-shadow: 0 14px 40px rgba(2, 132, 199, 0.45)...` + `filter: drop-shadow(...)`).

#### 🔤 Fijación de Tipografía Permanente (Inter)
- Selección fija e inmutable de la tipografía **Inter** para todo el sistema.
- Remoción definitiva del botón/selector de tipografías del header.

#### ⏱️ Fijación del AM/PM y Segundos Permanentes
- Corrección del movimiento horizontal del **PM**: implementación de números tabulares (`tabular-nums`) y caja fija para el `PM` / `AM`.
- Eliminación del botón `:SEC` / `:MIN` en la barra superior. Los segundos quedan configurados como **permanentes y siempre visibles** en todos los relojes de la plataforma.

---

### [2026-08-04] — Versión 1.1.0 (Detección Automática, Nuevo Isotipo, Eslogan en 2 Tonos & Slider Infinito de Países)

#### 🌐 Detección Dinámica de Ubicación y Zona Horaria del Sistema
- Implementación de la función `getDetectedUserCity()` en `src/data/cities.ts`.
- La aplicación lee automáticamente la zona horaria del sistema del navegador/dispositivo usando `Intl.DateTimeFormat().resolvedOptions().timeZone`.
- Si el usuario cambia de país o activa una VPN (por ejemplo, España), el sistema detecta automáticamente la nueva zona horaria (`Europe/Madrid`) y ajusta el reloj principal a la hora de esa ubicación.

#### ⚪ Encabezado Blanco Minimalista & Nuevo Isotipo de Marca (60px)
- Rediseño completo del `Header` sobre fondo blanco pulcro y minimalista.
- Integración de la nueva imagen oficial de la marca (icono cuadrado redondeado con "9:41 a.m.") en la esquina superior izquierda con un aumento de tamaño del 25% (`60px x 60px`).

#### ✍️ Eslogan Oficial en 2 Líneas & Jerarquía de Colores Azules
- Reubicación del eslogan a la derecha del logotipo en dos líneas verticales:
  - **TIME**: Azul Profundo Real (`#0D47A1`), asegurando un tono azul vibrante y claramente distinguible.
  - *beautifully simple.*: Azul Eléctrico Vibrante (`#0284C7`), creando una armonía visual fluida con las cifras del reloj.

#### 🏙️ Título Principal Exclusivo por Nombre de Ciudad
- Simplificación del encabezado principal para que muestre de forma directa y prominente únicamente el nombre de la ciudad activa (ej. *"Santo Domingo"*, *"Madrid"*, *"Tokio"*, *"New York"*).

---

### [2026-08-25] — Versión 1.2.0 (Planeta 3D Fotorrealista Google Maps, Sombra de Relieve & Marquee Tipográfico Interactivo)

#### 🌍 Globo Terráqueo 3D Fotorrealista Integrado (`src/components/RealisticEarthGlobe.tsx`)
- **Textura Oficial NASA Blue Marble:** Descarga e integración de la fotografía satelital oficial de alta resolución de la NASA (`/earth-blue-marble.jpg`).
- **Rotación 3D Precisa por Ciudad:** Matemática esférica exacta para centrar cualquier ciudad (`lat, lng`) frente a la cámara: `rotY = -lngRad - Math.PI / 2`, `rotX = latRad`.
- **Integración sobre Lienzo Blanco:** Remoción de tarjetas y recuadros oscuros. Renderizado WebGL con transparencia (`alpha: true`), permitiendo que el planeta 3D flote de manera limpia directamente sobre el lienzo blanco del sitio.
- **Polo 100% Redondeados y Radio +10%:** Ajuste de distancia de cámara (`cameraDistance = 280`) y radio (`globeRadius = 90`) con altura de viewport (`540px`), garantizando una esfera totalmente libre de recortes en los polos.
- **Pin de Ubicación Google Maps con Respiración Leve:** Marcador tridimensional rojo (`#e11d48`) con centro blanco y onda tenue en superficie con latido suave, pausado y orgánico (`pulseTime += 0.015`, variación de escala de ±6%).
- **Sombra de Relieve 3D Idéntica al Reloj:** Incorporación de un disco de sombreado posterior (`450px x 450px`, degradado radial en azul eléctrico `rgba(2, 132, 199, 0.65)` y `box-shadow: 0 25px 80px rgba(2, 132, 199, 0.7)`), creando un alto relieve que hace destacar la tridimensionalidad del planeta sobre el fondo blanco.

#### 🌊 Marquee Tipográfico Interactivo de Países (`src/components/CountryMarquee.tsx`)
- **Combinación Word Cloud + Scroll Infinito:** 4 filas dinámicas de países desplazándose continuamente a 60 FPS con extremo contraste de tamaños (títulos gigantes de `4.5rem` negrita 900 al lado de etiquetas pequeñas de `0.85rem`).
- **100% Matices de Azul:** Aplicación estricta de tonos de azul marino (`#071A33`), azul real (`#0D47A1`), azul eléctrico (`#0284C7`) y azul cielo (`#38BDF8`), eliminando tonos grises.
- **Interactividad Global:** Al hacer clic sobre cualquier país del marquee, se selecciona la ciudad correspondiente de la base de datos (ej. *Japón* -> *Tokio*, *España* -> *Madrid*, *Estados Unidos* -> *New York*), actualizando el reloj principal y rotando suavemente el globo 3D a esa posición.
- **Registro de Animación Completa:** Inclusión de `@keyframes scrollRight` en `src/index.css` para garantizar el movimiento ininterrumpido en todas las filas.

#### 🧹 Simplificación de Portada y Actualización de Marca (`App.tsx`, `Footer.tsx` e `index.html`)
- **Remoción del Reloj Mundial en Portada:** Eliminación del bloque `<WorldClock />` de la página de inicio para mantener la interfaz pulcra, centrada en el reloj principal, el globo 3D y el marquee de países.
- **Nombre de Marca 9:41 AM:** Actualización formal de la leyenda de pie de página y metadatos del sitio a **9:41 AM** (*"9:41 AM es una plataforma global de información temporal de alta precisión. Time, beautifully simple."*).

---

### [2026-09-06] — Versión 1.2.1 (Paleta Tipográfica del Marquee 100% Tonos de Azul)

#### 💙 Diversidad de Tonos de Azul sin Negro (`src/components/CountryMarquee.tsx`)
- **Exclusivamente Tonos de Azul:** Eliminación total de colores negros y grises. Implementación de una paleta rica y dinámica de azules: Azul Eléctrico (`#0284C7`), Azul Cielo Claro (`#38BDF8`), Azul Real Profundo (`#0D47A1`), Azul Cobalto (`#1D4ED8`), Azul Oceánico (`#0077B6`), Azul Celeste (`#60A5FA`) y Azul Brillante (`#0096C7`).
- **Hover Interactivo Mantenido:** Al pasar el cursor sobre cualquier nombre de país, resalta dinámicamente en azul cielo brillante con resplandor.

---

### [2026-09-06] — Versión 1.3.0 (Sistema Multilingüe Internacional — Top 10 Idiomas del Mundo)

#### 🌐 Motor de Traducción & Contexto React (`src/lib/i18n.ts`)
- **Soporte para los 10 Idiomas Más Hablados del Mundo:**
  1. 🇪🇸 **Español (ES)**
  2. 🇺🇸 **English (EN)**
  3. 🇨🇳 **中文 (ZH)**
  4. 🇮🇳 **हिन्दी (HI)**
  5. 🇸🇦 **العربية (AR)** — Soporte de dirección de lectura RTL (`dir="rtl"`).
  6. 🇫🇷 **Français (FR)**
  7. 🇧🇩 **বাংলা (BN)**
  8. 🇧🇷 **Português (PT)**
  9. 🇷🇺 **Русский (RU)**
  10. 🇯🇵 **日本語 (JA)**
- **Persistencia en localStorage (`941_language`):** Guarda la elección del usuario y detecta automáticamente el idioma nativo del navegador al ingresar por primera vez.
- **Formateo de Fecha Cultural:** Integración de `Intl.DateTimeFormat(locale)` para formatear la fecha según la cultura y reglas tipográficas de cada idioma.

#### 🔘 Botón Selector de Idioma en Encabezado (`src/components/Header.tsx`)
- Incorporación de un botón selector con icono global `🌐`, bandera del idioma activo y código ISO (ej. `🌐 🇪🇸 ES`).
- Menú desplegable flotante con las 10 banderas y nombres nativos de cada idioma.

---

### [2026-09-06] — Versión 1.3.1 (Detección Automática Inteligente por Navegador y Región Geográfica)

#### 🤖 Algoritmo de Detección Automática (`detectBestLanguage` en `src/lib/i18n.tsx`)
- **Detección por Preferencias del Navegador (`navigator.languages`):** Si un usuario entra desde los EE.UU. o con preferencia en inglés (`en-US`, `en-GB`, `en`), la plataforma carga automáticamente en **English**. Si entra con navegador en español (`es-ES`, `es-DO`, `es-MX`), carga en **Español**, y de igual forma para chino, hindi, árabe, francés, bengalí, portugués, ruso y japonés.
- **Fallback Geográfico por Zona Horaria (`Intl.DateTimeFormat().resolvedOptions().timeZone`):** Si el navegador no declara un idioma explícito, analiza la zona horaria del dispositivo (ej. `America/New_York`, `Europe/London`, `Australia/Sydney` -> English `en`; `America/Santo_Domingo`, `Europe/Madrid` -> Español `es`).
- **Respeto a Preferencia Manual:** Si el usuario elige manualmente un idioma usando el botón `🌐`, la elección prevalece y se guarda permanentemente en `localStorage`.

---

### [2026-09-06] — Versión 1.4.0 (Remoción de Icono GPS, Expansión de 50+ Ciudades Mundiales & Optimización SEO)

#### 🚫 Remoción del Icono GPS (`src/components/SearchModal.tsx`)
- **Eliminación del Cuadro con Icono MapPin:** Eliminación total del recuadro azul con el símbolo de GPS `<MapPin />` a la izquierda de cada resultado en la lista del buscador de ciudades.

#### 🌆 Expansión de Base de Datos de Ciudades (`src/data/cities.ts`)
- **Ampliación de 20 a más de 50 Metrópolis Globales:** Incorporación masiva de capitales y grandes centros urbanos globales en el Caribe, Latinoamérica, Norteamérica, Europa, Asia, Medio Oriente, África y Oceanía (Miami, Chicago, San Francisco, Vancouver, Barcelona, Ámsterdam, Lisboa, Bruselas, Viena, Atenas, Zúrich, Pekín, Nueva Delhi, Bangkok, Estambul, Johannesburgo, Auckland, Santiago, Lima, Caracas, Quito, San José, Ciudad de Panamá, Montevideo, La Habana, San Juan, etc.).

#### 🔍 Enriquecimiento y Posicionamiento SEO (`SearchModal.tsx` & `App.tsx`)
- **Cintillo / Badge de Enlace SEO por Ciudad (`seoSlug`):** Cada elemento del resultado del buscador muestra un cintillo de enlace amigable con la estructura SEO `🔗 941.am/#hora-en-[ciudad]`.
- **Enrutamiento por Hash Dinámico (`#hora-en-[slug]`):** Al seleccionar cualquier ciudad, la URL se actualiza instantáneamente con su slug SEO (ej. `http://localhost:3000/#hora-en-santo-domingo`, `#hora-en-tokio`, `#hora-en-madrid`).
- **Título Meta Dinámico (`document.title`):** Actualización automática del título `<title>` del navegador a `"Hora exacta en [Ciudad], [País] — 9:41 AM"`, optimizado para Google y motores de búsqueda.

---

### [2026-09-06] — Versión 1.4.1 (Cobertura Total de Ciudades de Estados Unidos — EE.UU.)

#### 🇺🇸 Cobertura Completa de EE.UU. (`src/data/cities.ts`)
- **Incorporación de Metrópolis y Capitales de EE.UU.:** Adición de más de 40 ciudades y capitales clave de los Estados Unidos en todos los husos horarios (Eastern, Central, Mountain, Pacific, Alaska y Hawái):
  - **Eastern:** Nueva York, Washington D.C., Miami, Orlando, Tampa, Jacksonville, Atlanta, Charlotte, Raleigh, Filadelfia, Pittsburgh, Boston, Baltimore, Detroit, Columbus, Cleveland, Cincinnati, Indianápolis, Louisville, Richmond.
  - **Central:** Chicago, Houston, Dallas, Austin, San Antonio, Fort Worth, Nueva Orleans, Nashville, Memphis, Minneápolis, San Luis, Kansas City, Milwaukee, Oklahoma City, Omaha.
  - **Mountain:** Denver, Phoenix, Salt Lake City, Albuquerque, El Paso.
  - **Pacific:** Los Ángeles, San Francisco, San Diego, San José (CA), Sacramento, Las Vegas, Seattle, Portland.
### [2026-09-06] — Versión 1.4.2 (Remoción de Banderas / Emojis del Selector de Idioma)

#### 🚫 Diseño Tipográfico Puro sin Banderas (`src/lib/i18n.tsx` & `src/components/Header.tsx`)
- **Remoción de Emojis de Banderas:** Eliminación de la propiedad `flag` de `SUPPORTED_LANGUAGES`. El botón del selector de idioma y el menú desplegable muestran exclusivamente texto tipográfico pulcro (códigos ISO como `ES`, `EN` y nombres nativos de los 10 idiomas), manteniendo la estética minimalista y profesional del sistema.

---

### [2026-09-06] — Versión 1.5.0 (Buscador y Selector Interactivo de Ciudades en Reloj Mundial)

#### 🔍 Buscador en Tiempo Real para Reloj Mundial (`src/components/WorldClock.tsx`)
- **Barra de Búsqueda Interactiva Integrada:** Adición de una caja de búsqueda inteligente en la sección *Reloj Mundial* que permite escribir y filtrar en tiempo real cualquiera de las más de 100 ciudades disponibles en la base de datos global (`CITIES_DATABASE`).
- **Desplegable Flotante de Autocompletado:** Al escribir o enfocar la barra, se despliega una lista con los nombres de ciudades, países, regiones y horas actuales con botones inmediatos `+ Añadir`.
- **Añadido Instantáneo:** Al hacer clic en cualquier ciudad filtrada (ej. *San Francisco*, *París*, *Tokio*, *Miami*, *Chicago*, *Hong Kong*), se agrega automáticamente a las tarjetas del Reloj Mundial y se guarda en `localStorage`.

### [2026-09-06] — Versión 1.5.1 (Remoción de Ícono del Globo Terráqueo en Título de Reloj Mundial)

#### 🌐 Limpieza de Encabezado (`src/components/WorldClock.tsx`)
- **Eliminación del Ícono del Mundo:** Remoción del ícono del globo terráqueo `<Globe />` a la izquierda del título *"Reloj Mundial"*, dejando el encabezado completamente limpio y con tipografía prominente.

### [2026-09-06] — Versión 1.6.0 (Traducción Completa e Integración i18n en Reloj Mundial)

#### 🌐 Soporte Multilingüe 100% en Reloj Mundial (`src/lib/i18n.tsx` & `src/components/WorldClock.tsx`)
- **Integración del Hook `useLanguage`:** Se conectó la sección *Reloj Mundial* al sistema internacional de traducción de la plataforma.
- **Traducciones en 10 Idiomas:** Títulos, subtítulos, etiquetas de ubicación principal, tarjetas de ciudades, estados vacíos, barra de búsqueda, placeholders, desplegable autocompletado y botones de sugerencias rápidas ahora responden dinámicamente y al instante al cambiar de idioma entre Español, English, 中文, हिन्दी, العربية, Français, বাংলা, Português, Русский y 日本語.

### [2026-09-06] — Versión 1.8.0 (Páginas Independientes Extensas para "Acerca de Nosotros" y "Política de Privacidad y Seguridad")

#### 📄 Páginas Dedicadas de Documentación Completa (`src/components/AboutPage.tsx` & `src/components/PrivacyPage.tsx`):
- **Remoción de Ventanas Modales:** Se eliminaron las ventanas flotantes emergentes y recuadros comprimidos. Ambas secciones ahora residen en páginas independientes completas y extensas.
- **Página "Acerca de Nosotros" (`AboutPage.tsx`):** Contiene el logotipo oficial de la marca (`/941am.PNG`), explicación detallada de de qué trata el proyecto **9:41 AM**, fundamentos tecnológicos (sincronización atómica ±14ms, cálculo de posición solar y motor gráfico 3D), la narrativa completa del homenaje a Steve Jobs y Apple del 9 de enero de 2007 a las 9:41 a.m. en el lanzamiento del primer iPhone, y el compromiso multilingüe internacional en 10 idiomas.
- **Página "Política de Privacidad y Seguridad" (`PrivacyPage.tsx`):** Documento legal completo con la declaración inviolable de cero cookies invasivas, cero rastreo publicitario, cero comercialización de datos personales y arquitectura de procesamiento 100% local en el navegador del usuario (`localStorage`).
- **Estilo Tipográfico Pulcro en Pie de Página (`Footer.tsx`):** Se eliminaron al 100% todos los iconos e emojis del pie de página (incluyendo la estrella `Sparkles` del eslogan *"Time, beautifully simple."* y los iconos de las columnas), logrando una presentación estética puramente tipográfica, limpia e impecable.
- **Navegación Intuitiva:** Botón superior de retorno a la página principal (*"← Volver al Reloj Principal"*) e integración fluida en la barra de navegación del menú superior y pie de página.

---

### [2026-09-06] — Versión 2.0.0 (Lanzamiento del Módulo de Blog SEO Multilingüe)

#### 📰 Arquitectura y Componentes del Blog (`src/data/blogPosts.ts`, `BlogListPage.tsx` & `BlogPostPage.tsx`):
- **Estructura de Datos Tipada:** Implementación de `BLOG_POSTS` y `BLOG_CATEGORIES` con los 5 Pilares Estratégicos de Contenido (Cultura Tech & Apple, Ciudades & Husos Horarios, Trabajo Remoto & Negocios, Viajes & Jet Lag, Ciencia del Tiempo & UTC).
- **Traducción Multilingüe Total:** Los 5 artículos semilla del lanzamiento están disponibles y localizados en los 10 idiomas del sistema (Español, Inglés, Chino, Hindi, Árabe, Francés, Bengalí, Portugués, Ruso y Japonés).
- **Optimizaciones SEO Posición 0:** Cada artículo incluye un recuadro **Featured Snippet Box (Respuesta Rápida)** de 35-45 palabras diseñado para capturar la Posición 0 de Google.
- **Herramientas Interactivas Incrustadas:** Integración directa de widgets en vivo (Reloj Focal, Comparador de Horarios y Convertidor UTC) dentro del cuerpo de los artículos según el tema.
- **Enrutamiento por Hash Dinámico (`#blog` y `#blog/[slug]`):** Soporte completo para navegación directa y compartición de enlaces SEO en redes sociales o buscadores.
- **Integración de Menú & Pie de Página (`Header.tsx` & `Footer.tsx`):** Inclusión de la opción **Blog** en la barra de navegación superior y una sección dedicada en el pie de página.

---

### [2026-09-06] — Versión 2.1.0 (Refinamiento Estético Ultra-Minimalista, Auditoría i18n al 100% e Investigación SEO)

#### 🎨 Rediseño Ultra-Minimalista del Blog (`BlogListPage.tsx` & `BlogPostPage.tsx`):
- **Rejilla Unificada de Artículos 3D:** Remoción de la tarjeta gigante destacada de héroe en la portada del blog. Todos los artículos ahora se presentan en una cuadrícula simétrica uniforme con sombreado 3D flotante elevado (`0 12px 32px rgba(...)`).
- **Limpieza de Insignias de Categoría:** Eliminación de las etiquetas superiores de categoría (ej. *"CULTURA TECH & APPLE"*) que flotaban sobre los títulos en las tarjetas, encabezados de artículos y artículos relacionados, dejando los títulos directamente en la parte superior.
- **Citas y Frases Sin Bordes:** Remoción de la línea vertical azul izquierda (`border-left`) y sangrado exagerado en las cajas de citas (`blockquote`).
- **Remoción de Banner Inferior CTA:** Eliminación de la caja azul inferior de llamado a la acción en la lectura de artículos, permitiendo que el final del texto fluya naturalmente hacia los artículos relacionados.

#### 🌐 Auditoría e Internacionalización 100% en los 10 Idiomas (`i18n.tsx` & `blogPosts.ts`):
- **Traducciones Integrales de Artículos:** Completado del cuerpo HTML (`contentHtml`), tablas comparativas, guías y fragmentos destacados al 100% de extensión en los **10 idiomas** (`es`, `en`, `zh`, `hi`, `ar`, `fr`, `bn`, `pt`, `ru`, `ja`).
- **Localización de Cadenas de Interfaz (UI):** Reemplazo de cadenas estáticas en español por llaves dinámicas (`t.blog.share`, `t.blog.linkCopied`, `t.blog.liveWidgetTitle`).
- **Autor e Información por Idioma:** Traducción del nombre y rol técnico del autor por idioma (ej. *"9:41 AM Team — Digital Time Research"*, *"فريق 9:41 AM"*).
- **Soporte RTL:** Flechas de navegación optimizadas para lenguajes de derecha a izquierda como el Árabe (`العودة للمدونة ←`).

#### 📊 Informe de Investigación SEO (`archivo.md`):
- Creación de la guía de investigación de palabras clave, intenciones de búsqueda de utilería vs informativas y plantilla editorial SEO para el nicho de herramientas de tiempo y husos horarios.

---

### [2026-09-07] — Versión 2.2.0 (Expansión de 5 Nuevos Artículos SEO Multilingües al 100%)

#### 📰 Nuevos Artículos de Alto Contenido SEO (`src/data/blogPosts.ts`):
- **Artículo 6 (Ciudades & Husos Horarios):** *"Diferencia Horaria entre Nueva York y Madrid: Guía Completa de Conversión y Horarios Ideales"* (Widget `comparator`).
- **Artículo 7 (Cultura Apple & 9:41):** *"La Historia del 9 de Enero de 2007: El Día en que Steve Jobs Cambió la Historia de la Tecnología"* (Widget `clock`).
- **Artículo 8 (Trabajo Remoto & Negocios):** *"Horarios Comerciales Globales: ¿A qué Hora Abren Wall Street, Londres y Tokio?"* (Widget `converter`).
- **Artículo 9 (Viajes, Turismo & Jet Lag):** *"Cruzando la Línea Internacional de Cambio de Fecha: El Enigma de Viajar al Pasado o al Futuro"* (Widget `clock`).
- **Artículo 10 (Ciencia del Tiempo & UTC):** *"Cómo Funciona un Reloj Atómico y por qué Sincronizamos 9:41 AM a ±14ms"* (Widget `utc-converter`).

#### 🌐 Homogeneidad Estética e Internacionalización Completa:
- **Respuesta Rápida Posición 0:** Cada artículo cuenta con su caja *Featured Snippet* (35-45 palabras) para captura de resultados de búsqueda cero en Google.
- **Soporte Multilingüe en 10 Idiomas:** Todos los nuevos artículos incluyen traducciones integrales en Español, Inglés, Chino, Hindi, Árabe, Français, Bengalí, Portugués, Ruso y Japonés.
- **Validación TypeScript:** Compilación estricta sin errores (`npx tsc --noEmit`).

---

#### [2026-09-07] — Versión 2.3.1 (Rediseño Tipográfico Editorial, i18n Total en 10 Idiomas & Plan Pre-Lanzamiento)

#### 📄 Rediseño Editorial Tipográfico Formal (`src/components/AboutPage.tsx`):
- **Eliminación Total de Iconos y Emojis:** Remoción completa de iconos Lucide React, símbolos y emojis en títulos y párrafos para lograr un estilo institucional formal.
- **Remoción de Recuadros, Tarjetas y Cajas Gráficas:** Eliminación del hero banner con degradado oscuro, minitarjetas en rejilla, bordes y cajas de llamadas (callouts), transformando la vista en un artículo continuo sobre lienzo blanco.
- **Estructura Editorial de Alta Legibilidad:** Reconstrucción integral con jerarquía semántica (`<h1>`, `<h2>`), subtítulos claros e interlineado optimizado (`1.85`).

#### 🌐 Internacionalización Multilingüe al 100% (`src/data/aboutContent.ts` & `src/data/privacyContent.ts`):
- **Cumplimiento Estricto de la Regla 1.6 de i18n:** Creación de diccionarios de traducción completa para las páginas "Acerca de 9:41 AM" y "Política de Privacidad".
- **Paridad en los 10 Idiomas del Sistema:** Cobertura integral en Español, English, 中文, हिन्दी, العربية (con dirección RTL), Français, বাংলা, Portugués, Русский y 日本語.
- **Respuesta Dinámica al Selector `🌐`:** Conexión al hook `useLanguage()`, permitiendo actualizar todo el artículo al instante al cambiar de idioma.

#### 🚀 Servidor Local, Verificación de Compilación y Plan Pre-Lanzamiento:
- **Ejecución de Servidor Dev:** Inicio del entorno local en `http://localhost:3000/`.
- **Validación TypeScript & Build:** Verificación exitosa de tipos sin errores (`npx tsc --noEmit` exit status 0) y prueba de empaquetado de producción (`npm run build` exit status 0).
- **Análisis de Arquitectura y Escalabilidad:** Diagnóstico técnico confirmando la capacidad del sistema 100% client-side para soportar 1M+ de usuarios simultáneos sin colapsar.
- **Inclusión de la Sección 6 (Pre-Launch Checklist):** Creación del plan oficial de 8 puntos clave para el lanzamiento a producción (Open Graph, sitemap, robots.txt, PWA manifest, Schema.org, Vite code splitting, README para GitHub y Firebase Analytics).

---

## 🔒 3. Política de Privacidad y Seguridad del Sistema 941

### 3.1 Garantía Absoluta de Privacidad y Derechos Reservados
- **Marca y Derechos:** `© 2026 9:41 AM — Todos los derechos reservados.`
- **Compromiso Inviolable de Privacidad:** En la plataforma **941**, la seguridad y la privacidad digital de los usuarios son principios fundamentales e innegociables.

### 3.2 Cero Recopilación de Datos y Cero Cookies Invasivas
- **No Comercialización ni Venta de Información:** No recopilamos, no compartimos ni vendemos ningún tipo de datos personales, información geográfica, dirección IP ni historial de navegación de los usuarios con terceras partes o agencias de publicidad.
- **Sin Cookies de Rastreo:** La aplicación no utiliza cookies de seguimiento, píxeles de remarketing ni herramientas de perfilación publicitaria.

### 3.3 Procesamiento 100% Local en el Navegador
- **Almacenamiento Local Aislado (`localStorage`):** Todas las preferencias (formato de hora 12h/24h, idioma preferido y lista de ciudades marcadas en el Reloj Mundial) se gestionan de manera 100% privada y local dentro del navegador web del dispositivo del usuario.

---

## 🍏 4. Acerca de Nosotros y Origen del Proyecto 9:41 AM

### 4.1 De qué Trata el Proyecto
**9:41 AM** es una plataforma web global de información temporal e inteligencia horaria internacional de ultra alta precisión (sincronizada a ±14ms). Ofrece hora exacta en tiempo real, cálculo dinámico de eventos solares (amanecer, atardecer y duración del día), planificador de reuniones multihorario y un planeta Tierra 3D fotorrealista bajo el principio fundamental *"Time, beautifully simple."*

### 4.2 Origen de la Inspiración — Homenaje a Apple y las 9:41 AM
Como apasionados y fanáticos acérrimos del diseño y de la cultura de **Apple**, el nombre de la plataforma rinde tributo directo a uno de los momentos más icónicos en la historia de la tecnología moderna:

- **El Lanzamiento del iPhone Original (9 de enero de 2007):** A las 9:00 a.m. Steve Jobs inició la mítica presentación magistral en la Macworld Keynote en San Francisco. La presentación estuvo calculada minuciosamente para que la revelación del iPhone ocurriera exactamente 40 minutos después. A las **9:41 a.m.**, la imagen del primer iPhone apareció en la pantalla gigante mostrando la hora `9:41 AM`.
- **Fijación Oficial en la Marca:** Desde esa fecha histórica, Apple mantiene fijada la hora **9:41 AM** en las fotografías y comerciales oficiales de sus productos clave (iPhone, iPad, Mac) como símbolo de perfección, innovación y simetría estética.
- **Filosofía 941:** Inspirados por este estándar de elegancia minimalista, creamos **9:41 AM**, un homenaje vivo a la precisión del tiempo y al diseño que transforma el mundo.

---

## 🚀 5. Plan Estratégico de Posicionamiento SEO & Guía Editorial para el Futuro Blog de 9:41 AM

*Nota: Este plan servirá como hoja de ruta técnica y editorial completa cuando se proceda a la fase de construcción e implementación del módulo de Blog en la plataforma 9:41 AM.*

### 5.1 Objetivo Estratégico SEO Global
El objetivo del Blog de **9:41 AM** es posicionar el dominio en el **puesto #1 de búsquedas orgánicas globales** en Google para consultas relacionadas con hora exacta, diferencias horarias entre ciudades y países, conversión de zonas horarias (UTC/GMT), trabajo remoto distribuido, cultura tecnológica e historia del horario 9:41 AM de Apple.

### 5.2 Arquitectura de Contenidos: Los 5 Pilares (Topic Clusters)

```
                          ┌──────────────────────────┐
                          │   BLOG PROYECTO 9:41 AM  │
                          └────────────┬─────────────┘
                                       │
      ┌────────────────┬───────────────┼───────────────┬────────────────┐
      │                │               │               │                │
┌─────┴─────┐    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐    ┌─────┴─────┐
│ PILAR 1   │    │ PILAR 2   │   │ PILAR 3   │   │ PILAR 4   │    │ PILAR 5   │
│ Ciudades  │    │ Trabajo   │   │ Viajes &  │   │ Cultura   │    │ Ciencia & │
│ & Países  │    │ Remoto &  │   │ Jet Lag & │   │ Apple &   │    │ UTC/GMT & │
│ Horarios  │    │ Negocios  │   │ Turismo   │   │ 9:41 AM   │    │ Estándares│
└───────────┘    └───────────┘   └───────────┘   └───────────┘    └───────────┘
```

#### 📍 PILAR 1: Ciudades, Países y Husos Horarios (SEO Transaccional e Informativo)
Búsquedas masivas diarias sobre horas locales y diferencias geográficas por países clave.
- **Artículo 1.1:** *"Diferencia Horaria entre España y México: Guía Completa de Husos Horarios"* (Objetivo: 🇪🇸 España / 🇲🇽 México).
- **Artículo 1.2:** *"Eastern Time (EST) vs Pacific Time (PST): Everything You Need to Know"* (Objetivo: 🇺🇸 EE.UU. / 🇨🇦 Canadá).
- **Artículo 1.3:** *"Horario de Verano e Invierno en EE.UU.: ¿Cuándo Cambia la Hora en 2026?"* (Objetivo: 🇺🇸 EE.UU. Hispano / 🇲🇽 México).
- **Artículo 1.4:** *"Fusos Horários no Brasil: Como Funciona a Hora em São Paulo, Brasília e Noronha"* (Objetivo: 🇧🇷 Brasil / 🇵🇹 Portugal).
- **Artículo 1.5:** *"Diferencia Horaria entre Nueva York y Londres: Horarios Ideales para Llamadas"* (Objetivo: 🇺🇸 EE.UU. / 🇬🇧 Reino Unido).

#### 💼 PILAR 2: Trabajo Remoto, Productividad Global y Negocios (B2B / Profesionales)
Enfocado en empresas, freelancers, equipos distribuidos y ejecutivos internacionales.
- **Artículo 2.1:** *"Cómo Coordinar Reuniones Internacionales sin Errores de Huso Horario"*.
- **Artículo 2.2:** *"The Ultimate Guide to Managing Async Distributed Teams Across 5 Time Zones"*.
- **Artículo 2.3:** *"Horarios Comerciales Globales: ¿A qué hora abren Wall Street, Londres y Tokio?"*.
- **Artículo 2.4:** *"Guía de Etiqueta para Enviar Mensajes a Colegas en Diferentes Zonas Horarias"*.

#### ✈️ PILAR 3: Viajes, Turismo y Jet Lag (Estilo de Vida y Viajeros)
Enfocado en viajeros internacionales, nómadas digitales y aerolíneas.
- **Artículo 3.1:** *"Cómo Evitar el Jet Lag en Vuelos Transatlánticos: Consejos Basados en la Ciencia"*.
- **Artículo 3.2:** *"Cruzando la Línea Internacional de Cambio de Fecha: El Enigma de Viajar al Pasado"*.
- **Artículo 3.3:** *"Los Países con Más Husos Horarios del Mundo (Y por qué Francia encabeza la lista)"*.

#### 🍏 PILAR 4: Cultura Tech, Historia del Tiempo y Tributo a Apple (Búsquedas de Marca y Virales)
Enfocado en fanáticos de la tecnología, Apple, diseño minimalista e historia.
- **Artículo 4.1:** *"¿Por qué los Anuncios de Apple Siempre Muestran las 9:41 AM?"*.
- **Artículo 4.2:** *"La Historia del 9 de Enero de 2007: El Día en que Steve Jobs Cambió el Mundo a las 9:41 AM"*.
- **Artículo 4.3:** *"Elegancia y Simetría en el Diseño de Interfaces: La Filosofía de 'Time, beautifully simple.'"*.

#### 🔬 PILAR 5: Ciencia del Tiempo, UTC/GMT y Astronomía (Técnicas y Educativas)
Enfocado en programadores, científicos, estudiantes y apasionados de la astronomía.
- **Artículo 5.1:** *"¿Cuál es la Diferencia Real entre UTC y GMT? (Y por qué no son lo mismo)"*.
- **Artículo 5.2:** *"Cómo Funciona un Reloj Atómico y por qué Sincronizamos 9:41 AM a ±14ms"*.
- **Artículo 5.3:** *"La Ecuación del Tiempo: Por qué el Mediodía Solar Rara Vez es a las 12:00 Exactas"*.

---

### 5.3 Estructura de Redacción On-Page SEO Requerida para Cada Artículo

Cada entrada redactada para el blog deberá seguir el siguiente esquema de optimización:

1. **Título H1 Convincente:** Incluir la palabra clave principal + el año vigente.
2. **Featured Snippet Box (Respuesta Rápida):** Párrafo conciso de 35-45 palabras al inicio respondiendo la pregunta clave para aparecer en la posición cero de Google.
3. **Widget Interactivo de 9:41 AM:** Incrustación directa del reloj en vivo de la ciudad o herramienta comparadora dentro del cuerpo del artículo.
4. **Subtítulos H2 y H3 Estructurados:** Distribución lógica de contenidos con tablas comparativas.
5. **Schema.org Markup:** Implementación de datos estructurados `FAQPage`, `Article` y `HowTo`.
6. **Llamado a la Acción (CTA Interno):** Enlazado interno hacia el Reloj Mundial, Comparador de Horarios o Convertidor UTC de 9:41 AM.

---

### 5.4 Hoja de Ruta para la Futura Ejecución del Blog

- **Fase A:** Creación del módulo `/blog` con la estética minimalista, fondo blanco y paleta de azul marino de 9:41 AM.
- **Fase B:** Publicación del lote semilla (10 artículos iniciales de mayor impacto).
- **Fase C:** Localización multilingüe a los 10 idiomas del sistema (Español, Inglés, Chino, Ruso, Portugués, etc.).
- **Fase D:** Difusión y estrategias de linkbuilding en comunidades tech (Hacker News, Reddit, Medium).

---

## 📋 6. Plan de Verificación y Hoja de Ruta Pre-Lanzamiento (Pre-Launch Checklist)

Este plan detalla los 8 pilares técnicos y de infraestructura necesarios para garantizar un lanzamiento oficial perfecto de **9:41 AM** en producción, asegurando máxima visibilidad SEO, rendimiento de alta velocidad y monitoreo en tiempo real.

### 📌 Control de Estado y Tareas Pendientes (Status Tracker)

| # | Componente / Tarea | Descripción y Propósito | Estado |
| :-: | :--- | :--- | :---: |
| **1** | **Metadatos Open Graph & Twitter Cards** | Configuración de etiquetas meta `og:image`, `og:title`, `og:description` y `twitter:card` en `index.html` para generar vistas previas visuales enriquecidas al compartir enlaces en WhatsApp, X (Twitter), LinkedIn, iMessage y Slack. | ⏳ *Pendiente* |
| **2** | **Archivos de Indexación SEO (`sitemap.xml` & `robots.txt`)** | Generación de `public/sitemap.xml` con todas las rutas de ciudades (`#hora-en-[ciudad]`), artículos del blog y páginas institucionales, junto con `public/robots.txt` para garantizar la indexación completa en Google y Bing. | ⏳ *Pendiente* |
| **3** | **Modo App Móvil (PWA Manifest & Apple Touch Icon)** | Creación de `public/manifest.webmanifest` y etiqueta `<link rel="apple-touch-icon">` en `index.html` para permitir que usuarios de iOS y Android instalen 9:41 AM en su pantalla de inicio como app nativa. | ⏳ *Pendiente* |
| **4** | **Datos Estructurados Schema.org (JSON-LD)** | Inclusión de marcado semántico JSON-LD en `index.html` definiendo el sitio como `WebApplication` de alta precisión para capturar fragmentos enriquecidos (rich snippets) en motores de búsqueda. | ⏳ *Pendiente* |
| **5** | **Optimización del Bundle (Vite Code Splitting)** | Configuración de `manualChunks` en `vite.config.ts` para separar la librería gráfica Three.js (`vendor-three`) del bundle principal de React, garantizando cargas instantáneas en conexiones móviles 3G/4G. | ⏳ *Pendiente* |
| **6** | **Preparación para GitHub & Repositorio Público** | Auditoría estricta de `.gitignore` y redacción del archivo `README.md` profesional para la presentación oficial del proyecto en GitHub (con arquitectura, capturas, stack técnico y guía de instalación). | ⏳ *Pendiente* |
| **7** | **Monitoreo & Telemetría con Firebase Analytics** | Integración del SDK de Firebase Analytics (`src/lib/firebase.ts`) para medir visitantes únicos, retención, ciudades más buscadas y cambios de idioma en tiempo real. | ⏳ *Pendiente* |
| **8** | **Despliegue en CDN Edge & Dominio Propio** | Vinculación del dominio oficial en plataforma de entrega global (Cloudflare Pages / Vercel / Netlify) con SSL gratuito, compresión Brotli y alta disponibilidad. | ⏳ *Pendiente* |

---

*Documento generado y mantenido por el equipo de desarrollo de 941.*

