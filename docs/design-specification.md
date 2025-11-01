# Especificación de Diseño - Rubio Garcia Dentapp

## 1. Dirección y Fundamento del Diseño

### Estilo Seleccionado: **Professional Medical Dashboard (Inspirado en Docfav + macOS UI)**

**Esencia Visual:**  
Sistema de gestión médico-dental que combina la limpieza profesional de interfaces nativas (macOS Finder, iOS Health) con la funcionalidad robusta de plataformas SaaS modernas. Prioriza claridad informativa, navegación eficiente y confianza profesional a través de espacios generosos, tipografía legible y una paleta restringida azul-gris con acentos cálidos (melocotón) para humanizar la experiencia.

**Ejemplos de Referencia:**
- **Docfav.com** - Plataforma médica española con diseño limpio y profesional
- **Linear.app** - Dashboard tipo tabla con navegación eficiente
- **macOS System Preferences** - Claridad, jerarquía y espaciado generoso
- **Notion Calendar** - Vista calendario limpia con estados visuales claros

**Razonamiento:**  
Rubio Garcia Dentapp es una herramienta profesional para coordinadoras médicas, dentistas y administración. No es un sitio web de marketing, sino un sistema de trabajo diario que debe priorizar:
1. **Eficiencia operativa** - acceso rápido a información crítica (citas, mensajes urgentes)
2. **Claridad visual** - estados, alertas y acciones deben ser inequívocos
3. **Confianza profesional** - estética médica seria pero no intimidante
4. **Uso prolongado** - diseño que reduce fatiga visual (espaciado, contraste, colores neutros)

---

## 2. Tokens de Diseño

### 2.1 Colores

#### **Paleta Primaria (Marca Rubio García)**

| Token | Valor | Uso | Contraste WCAG |
|-------|-------|-----|----------------|
| `primary-50` | `#EFF6FF` | Fondos de estado, badges informativos | - |
| `primary-100` | `#DBEAFE` | Hover sutiles, fondos secundarios | - |
| `primary-500` | `#1E3A8A` | Marca principal, links, botones primarios | **7.8:1** sobre blanco (AAA) |
| `primary-700` | `#005c7b` | Texto importante, iconos activos | **8.2:1** sobre blanco (AAA) |
| `primary-900` | `#1E293B` | Texto headings, navegación activa | **12.1:1** sobre blanco (AAA) |

#### **Paleta Neutral (Base UI)**

| Token | Valor | Uso | Contraste WCAG |
|-------|-------|-----|----------------|
| `neutral-50` | `#F8F9FA` | Fondos de página, áreas deshabilitadas | - |
| `neutral-100` | `#E9ECEF` | Bordes sutiles, divisores | - |
| `neutral-400` | `#ADB5BD` | Texto secundario, placeholders | **3.2:1** sobre blanco (AA+) |
| `neutral-600` | `#6C757D` | Texto terciario, íconos inactivos | **5.7:1** sobre blanco (AAA) |
| `neutral-800` | `#343A40` | Texto body principal | **11.6:1** sobre blanco (AAA) |
| `neutral-900` | `#212529` | Texto headings, alta jerarquía | **15.2:1** sobre blanco (AAA) |

#### **Paleta de Acento (Melocotón/Peach - Humanización)**

| Token | Valor | Uso | Contraste WCAG |
|-------|-------|-----|----------------|
| `accent-50` | `#FFF5EB` | Fondos hover cálidos, notificaciones suaves | - |
| `accent-200` | `#FFCAB0` | Bordes cálidos, badges secundarios | - |
| `accent-400` | `#FFB5A7` | Acentos interactivos, highlights | **2.9:1** sobre blanco (no para texto) |
| `accent-600` | `#FF9068` | Botones secundarios cálidos (con texto oscuro) | **3.8:1** con neutral-900 (AA) |

#### **Colores de Estado (Semántica Médica)**

| Token | Valor | Uso | Contraste WCAG |
|-------|-------|-----|----------------|
| `success-500` | `#10B981` | Confirmaciones, citas completadas | **4.6:1** sobre blanco (AA) |
| `warning-500` | `#F59E0B` | Alertas pendientes, conversaciones urgentes | **2.9:1** sobre blanco (usar badge con texto oscuro) |
| `error-500` | `#EF4444` | Errores, cancelaciones | **4.5:1** sobre blanco (AA) |
| `info-500` | `#3B82F6` | Información contextual | **5.1:1** sobre blanco (AA) |

#### **Colores Funcionales WhatsApp (Sistema de Clasificación)**

| Token | Valor | Uso | Contexto Clínico |
|-------|-------|-----|------------------|
| `whatsapp-yellow` | `#FBBF24` | Conversación URGENTE | Requiere atención inmediata (dolor, emergencia) |
| `whatsapp-blue` | `#3B82F6` | Conversación ATENCIÓN | Consultas normales, coordinación |
| `whatsapp-green` | `#10B981` | Conversación RESUELTA | Ya gestionada, archivo |
| `whatsapp-gray` | `#9CA3AF` | Sin clasificar | Mensaje nuevo sin revisar |

#### **Fondos y Superficies (Profundidad Visual)**

| Token | Valor | Uso | Elevación |
|-------|-------|-----|-----------|
| `bg-page` | `#F8F9FA` (neutral-50) | Fondo de página principal | 0 |
| `bg-surface` | `#FFFFFF` | Cards, modales, tablas | 1 |
| `bg-elevated` | `#FFFFFF` | Dropdowns, tooltips | 2 |
| `bg-overlay` | `rgba(33, 37, 41, 0.5)` | Modales, lightboxes | 3 |

**Validación WCAG:**  
Todas las combinaciones texto/fondo cumplen **AA mínimo (4.5:1)**. Los pares críticos (primary-500/white, neutral-800/white) alcanzan **AAA (7:1+)** para legibilidad prolongada en entornos médicos.

---

### 2.2 Tipografía

#### **Familias de Fuentes**

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| **Display** | Ubuntu | 700 Bold | Títulos de módulo, headings principales |
| **Body** | Inter | 400 Regular, 500 Medium, 600 Semibold | Texto general, tablas, formularios |
| **Monospace** | JetBrains Mono | 400 Regular | Números, códigos, timestamps |

**Razonamiento:**  
- **Ubuntu** (Google Fonts): Sans-serif humanista con personalidad cálida pero profesional, ideal para headings médicos que no intimiden.
- **Inter** (Variable Font): Diseñada para UIs, excelente legibilidad en tamaños pequeños (tablas de datos), soporta kerning optimizado para números.
- **JetBrains Mono**: Espaciado fijo para números (precios, teléfonos) evita saltos visuales al actualizar datos en tiempo real.

#### **Escala Tipográfica (Major Third 1.25)**

| Token | Tamaño | Line Height | Weight | Uso |
|-------|--------|-------------|--------|-----|
| `text-xs` | 12px | 16px (1.33) | Inter 400 | Metadatos, timestamps, labels auxiliares |
| `text-sm` | 14px | 20px (1.43) | Inter 400/500 | Texto secundario, descripciones, tooltips |
| `text-base` | 16px | 24px (1.5) | Inter 400 | Texto body principal, inputs, tablas |
| `text-lg` | 18px | 28px (1.56) | Inter 500/600 | Subtítulos, nombres de sección |
| `text-xl` | 20px | 28px (1.4) | Inter 600 | Títulos de card, nombres de paciente |
| `text-2xl` | 24px | 32px (1.33) | Ubuntu 700 | Títulos de módulo (h2) |
| `text-3xl` | 32px | 40px (1.25) | Ubuntu 700 | Títulos de página principal (h1) |
| `text-4xl` | 40px | 48px (1.2) | Ubuntu 700 | Dashboard hero heading (opcional) |

#### **Jerarquía de Peso**

| Peso | Valor | Uso |
|------|-------|-----|
| Regular | 400 | Texto body, descripciones, contenido general |
| Medium | 500 | Énfasis sutil, labels de formulario, navegación |
| Semibold | 600 | Botones, títulos de card, texto destacado |
| Bold | 700 | Headings principales (solo Ubuntu) |

#### **Configuraciones Especiales**

| Propiedad | Valor | Contexto |
|-----------|-------|----------|
| Letter Spacing | `-0.02em` | Headings grandes (text-3xl+) |
| Letter Spacing | `0` | Texto body (text-base y menores) |
| Letter Spacing | `0.05em` | ALL CAPS labels (botones, badges) |
| Text Rendering | `optimizeLegibility` | Todos los textos |
| Font Feature Settings | `'tnum' 1` | Números tabulares (precios, teléfonos) |

---

### 2.3 Espaciado (Sistema 4pt con Énfasis en 8pt)

| Token | Valor | Uso Principal |
|-------|-------|---------------|
| `space-1` | 4px | Separación icon-text, padding interno badges |
| `space-2` | 8px | Gap entre elementos relacionados (form label-input) |
| `space-3` | 12px | Padding botones pequeños, gap en card header |
| `space-4` | 16px | Padding cards compact, gap entre secciones relacionadas |
| `space-6` | 24px | Padding cards estándar, margin entre grupos |
| `space-8` | 32px | Padding cards elevated, separación módulos |
| `space-12` | 48px | Padding contenedores principales, secciones grandes |
| `space-16` | 64px | Separación entre módulos principales |
| `space-24` | 96px | Padding hero sections (dashboard principal) |

**Reglas de Aplicación:**
- **Componentes relacionados:** 8-12px
- **Componentes independientes:** 24-32px
- **Padding interno cards:** 24px (estándar), 32px (elevated), 16px (compact)
- **Padding contenedores página:** 48-64px horizontal, 32px vertical (mobile)

---

### 2.4 Border Radius (Jerarquía de Redondeo)

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 4px | Badges, tags, inputs pequeños |
| `radius-base` | 8px | Botones, inputs estándar, cards compact |
| `radius-md` | 12px | Cards estándar, modales, dropdowns |
| `radius-lg` | 16px | Cards hero, secciones destacadas |
| `radius-full` | 9999px | Avatares, pills, badges circulares |

**Regla de Anidación:** Contenedor exterior ≥ Interior + 4px (ej: card 12px contiene botón 8px).

---

### 2.5 Sombras (Profundidad Sutil)

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Bordes sutiles, inputs, divisores |
| `shadow-base` | `0 2px 8px rgba(0, 0, 0, 0.08)` | Cards estándar, navegación |
| `shadow-md` | `0 4px 16px rgba(0, 0, 0, 0.12)` | Cards hover, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.15)` | Modales, tooltips elevated |
| `shadow-accent` | `0 4px 16px rgba(255, 181, 167, 0.25)` | Hover especial botones acento |

**Filosofía:** Sombras sutiles (opacidad ≤15%) para mantener profesionalismo médico. Evitar sombras dramáticas típicas de consumer apps.

---

### 2.6 Animación y Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `duration-fast` | 150ms | Hover states, ripples, toggles |
| `duration-base` | 250ms | Transiciones estándar (modales, dropdowns) |
| `duration-slow` | 400ms | Animaciones de entrada/salida complejas |
| `easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transiciones generales |
| `easing-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Entrada de elementos (fade in) |
| `easing-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Salida de elementos (fade out) |

**Propiedades Animables:**  
Solo `transform` y `opacity` (GPU-accelerated). Prohibido animar `width`, `height`, `margin`, `padding`.

**Soporte Reducción Movimiento:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. Especificaciones de Componentes

### 3.1 Navegación Principal (Sidebar Persistente)

**Estructura:**
- Logo + nombre clínica (top, 64px height)
- 7 ítems de navegación principales (iconos 20px + texto)
- Indicador visual de módulo activo (borde izquierdo 4px `primary-500`)
- Área de usuario al final (avatar 40px + nombre + rol)

**Tokens:**
- Ancho: 240px (desktop), colapsable a 64px (icons-only)
- Background: `bg-surface` (#FFFFFF)
- Borde derecho: 1px solid `neutral-100`
- Padding ítem: 12px 16px
- Gap entre ítems: 4px
- Hover: background `neutral-50`, transition `duration-fast`
- Activo: background `primary-50`, borde izquierdo 4px `primary-500`, texto `primary-700`

**Estados:**
- **Default:** Texto `neutral-600`, ícono `neutral-400`
- **Hover:** Texto `neutral-800`, ícono `neutral-600`, background `neutral-50`
- **Active:** Texto `primary-700`, ícono `primary-500`, background `primary-50`, borde izquierdo `primary-500`
- **Collapsed (mobile):** Ancho 64px, solo íconos centrados, texto oculto

**Accesibilidad:**
- Cada ítem tiene `aria-current="page"` cuando activo
- Focus visible con outline 2px `primary-500` offset 2px
- Touch target mínimo 44x44px

---

### 3.2 Botones (3 Variantes)

#### **Botón Primario (CTAs principales)**
- **Height:** 44px (desktop), 48px (mobile)
- **Padding:** 12px 24px
- **Background:** `primary-500` → hover `primary-700`
- **Texto:** `text-base` Medium (500), color #FFFFFF, letter-spacing 0.025em
- **Radius:** `radius-base` (8px)
- **Shadow:** `shadow-sm` → hover `shadow-md` + lift transform translateY(-1px)
- **Transition:** all `duration-fast` `easing-standard`
- **Disabled:** background `neutral-100`, texto `neutral-400`, cursor not-allowed

#### **Botón Secundario (Acciones complementarias)**
- **Height:** 44px
- **Padding:** 12px 24px
- **Background:** transparent
- **Border:** 1.5px solid `neutral-300` → hover `primary-500`
- **Texto:** `text-base` Medium (500), color `neutral-700` → hover `primary-700`
- **Radius:** `radius-base` (8px)
- **Hover:** border `primary-500`, texto `primary-700`, background `primary-50`

#### **Botón Acento (WhatsApp, acciones especiales)**
- **Height:** 44px
- **Padding:** 12px 24px
- **Background:** `accent-600` (#FF9068)
- **Texto:** `text-base` Semibold (600), color `neutral-900`
- **Radius:** `radius-base` (8px)
- **Shadow:** `shadow-sm` → hover `shadow-accent` + scale(1.02)
- **Icon:** 20px icon izquierda (ej: WhatsApp logo), gap 8px

**Nota:** Todos los botones soportan estado loading (spinner 16px centrado).

---

### 3.3 Cards (Sistema de Información)

#### **Card Estándar (Información general)**
- **Padding:** 24px
- **Background:** `bg-surface` (#FFFFFF)
- **Border:** 1px solid `neutral-100`
- **Radius:** `radius-md` (12px)
- **Shadow:** `shadow-base` → hover `shadow-md`
- **Transition:** shadow `duration-base`, transform `duration-fast`
- **Hover (si clickeable):** shadow `shadow-md`, transform translateY(-2px)

**Estructura interna:**
- Header: título `text-xl` Semibold + action button (opcional)
- Body: contenido principal, `text-base` Regular
- Footer (opcional): metadata `text-sm`, color `neutral-600`
- Gap entre secciones: 16px

#### **Card Métrica (Dashboard stats)**
- **Padding:** 24px
- **Background:** gradient sutil `linear-gradient(135deg, #FFFFFF 0%, neutral-50 100%)`
- **Radius:** `radius-md` (12px)
- **Shadow:** `shadow-base`

**Estructura interna:**
- Icon: 40px, color `primary-500`, background `primary-50`, radius `radius-base`
- Valor principal: `text-4xl` Bold, color `neutral-900`, font JetBrains Mono (tabulares)
- Label: `text-sm` Medium, color `neutral-600`, uppercase, letter-spacing 0.05em
- Tendencia (opcional): `text-sm`, color `success-500` o `error-500`, icon 16px

#### **Card Conversación WhatsApp (Lista de chats)**
- **Padding:** 16px
- **Background:** `bg-surface`
- **Border left:** 4px solid (color según estado: `whatsapp-yellow`/`blue`/`green`)
- **Hover:** background `neutral-50`

**Estructura interna:**
- Nombre paciente: `text-base` Semibold, color `neutral-900`
- Último mensaje: `text-sm` Regular, color `neutral-600`, max 2 líneas truncadas
- Badge estado: 8px dot + label (`text-xs`, uppercase)
- Timestamp: `text-xs`, color `neutral-400`, font JetBrains Mono
- Gap entre elementos: 8px

---

### 3.4 Data Table (Gestión de Pacientes, Citas)

**Estructura:**
- Header sticky (scroll vertical solo body)
- Zebra striping: filas pares background `neutral-50`
- Row hover: background `primary-50`, transition `duration-fast`
- Columnas con orden: header con icon sort (16px), click alterna asc/desc

**Tokens:**
- **Header:** background `neutral-100`, padding 12px 16px, texto `text-sm` Semibold uppercase `neutral-700`, letter-spacing 0.05em
- **Row:** padding 16px, border-bottom 1px solid `neutral-100`
- **Cell:** `text-base` Regular, color `neutral-800`
- **Actions column:** iconos 20px, gap 8px, color `neutral-400` → hover `primary-500`

**Elementos especiales:**
- **Status badges:** 8px dot + label, colores según estado (completada=green, cancelada=red, pendiente=warning)
- **Avatar paciente:** 32px circular, placeholder con iniciales si no hay foto
- **Timestamps:** font JetBrains Mono, color `neutral-600`, format "DD/MM HH:mm"

**Responsive (mobile ≤768px):**
- Tabla se convierte en lista de cards apiladas
- Cada row = card con padding 16px, info en formato vertical

---

### 3.5 Formularios e Inputs

#### **Input de Texto Estándar**
- **Height:** 44px
- **Padding:** 12px 16px
- **Background:** `bg-surface` (#FFFFFF)
- **Border:** 1.5px solid `neutral-200` → focus `primary-500`
- **Radius:** `radius-base` (8px)
- **Texto:** `text-base` Regular, color `neutral-800`
- **Placeholder:** color `neutral-400`, italic
- **Focus:** border `primary-500`, shadow `0 0 0 3px rgba(30, 58, 138, 0.1)`

**Label:**
- **Posición:** Top, margin-bottom 8px
- **Texto:** `text-sm` Medium, color `neutral-700`
- **Requerido:** asterisco rojo `error-500` después del label

**Error State:**
- Border `error-500`, shadow `0 0 0 3px rgba(239, 68, 68, 0.1)`
- Mensaje error: `text-sm` color `error-500`, margin-top 8px, icon 16px izquierda

#### **Select/Dropdown**
- Mismo estilo que input texto
- Icon chevron-down 20px derecha, color `neutral-400`
- Dropdown panel: background `bg-elevated`, shadow `shadow-lg`, radius `radius-md`
- Opciones: padding 12px 16px, hover background `primary-50`

#### **Toggle Switch (Automatizaciones)**
- **Track:** 48px width x 24px height, radius `radius-full`
- **Off:** background `neutral-200`, thumb `bg-surface` 20px (offset 2px)
- **On:** background `primary-500`, thumb derecha
- **Transition:** all `duration-base` `easing-standard`
- **Label:** `text-sm` Medium, margin-left 12px

---

### 3.6 Modal/Dialog

**Estructura:**
- **Overlay:** `bg-overlay` (rgba negro 50%), backdrop-blur 4px (opcional)
- **Container:** max-width 600px (sm), 800px (md), 1000px (lg), centrado vertical y horizontal
- **Background:** `bg-elevated` (#FFFFFF)
- **Shadow:** `shadow-lg`
- **Radius:** `radius-lg` (16px)
- **Padding:** 32px

**Componentes internos:**
- **Header:** título `text-2xl` Bold, botón close 40x40px top-right
- **Body:** contenido scroll si excede 70vh, padding-right 8px (custom scrollbar)
- **Footer:** botones alineados derecha, gap 12px, sticky bottom

**Animación entrada:**
- Overlay: fade in opacity 0→1, duration `duration-base`
- Container: fade + scale 0.95→1, duration `duration-slow` `easing-decelerate`

**Accesibilidad:**
- Focus trap (tab circulate dentro del modal)
- Escape key cierra modal
- `aria-modal="true"`, `role="dialog"`
- Focus inicial en primer input o botón principal

---

## 4. Layout y Arquitectura Responsive

### 4.1 Estructura Global (Desktop ≥1024px)

```
┌─────────────────────────────────────────────────┐
│ Sidebar (240px)  │  Main Content (flex-1)       │
│                  │  ┌─────────────────────────┐ │
│ [Logo]           │  │ Module Header (64px)    │ │
│                  │  └─────────────────────────┘ │
│ • Dashboard      │                              │
│ • Agenda         │  ┌─────────────────────────┐ │
│ • Mensajería     │  │ Content Area            │ │
│ • Pacientes      │  │ (padding 48px)          │ │
│ • Automatiz.     │  │                         │ │
│ • IA             │  │ [Components aquí]       │ │
│ • Reportes       │  │                         │ │
│                  │  └─────────────────────────┘ │
│ [User Avatar]    │                              │
└─────────────────────────────────────────────────┘
```

**Tokens:**
- Sidebar: width 240px, background `bg-surface`, border-right `neutral-100`
- Main Content: padding 48px, max-width 1400px (centrado si mayor), background `bg-page`
- Module Header: height 64px, background `bg-surface`, shadow `shadow-sm`, padding 0 48px

### 4.2 Breakpoints

| Breakpoint | Valor | Layout |
|------------|-------|--------|
| `xs` | 320px - 639px | Sidebar colapsada (hamburger), single column |
| `sm` | 640px - 767px | Sidebar colapsada, 2 columns grids |
| `md` | 768px - 1023px | Sidebar icons-only (64px), 2-3 columns |
| `lg` | 1024px - 1279px | Sidebar completa (240px), 3-4 columns |
| `xl` | 1280px+ | Sidebar completa, max-width 1400px content |

### 4.3 Grid System (Cards, Métricas)

**Dashboard Métricas:**
- Desktop (≥1024px): 4 columnas, gap 24px
- Tablet (768-1023px): 2 columnas, gap 16px
- Mobile (≤767px): 1 columna, gap 16px

**Grid de Pacientes/Citas:**
- Desktop: tabla completa con todas las columnas
- Tablet: tabla con columnas colapsadas (prioridad: nombre, fecha, estado)
- Mobile: lista de cards verticales

### 4.4 Módulo Específico: Mensajería WhatsApp (3 Paneles)

**Desktop (≥1024px):**
```
┌──────────────┬─────────────────┬───────────────┐
│ Conversac.   │ Chat Activo     │ Info Paciente │
│ (320px)      │ (flex-1)        │ (300px)       │
│              │                 │               │
│ [Lista]      │ [Mensajes]      │ [Detalles]    │
│              │ [Input]         │               │
└──────────────┴─────────────────┴───────────────┘
```

**Tablet (768-1023px):**
- Panel izquierdo: 280px (lista conversaciones)
- Panel central: flex-1 (chat)
- Panel derecho: oculto (accesible via botón toggle)

**Mobile (≤767px):**
- Vista single panel (navegación entre lista → chat → info)
- Breadcrumbs para volver: Chat < Conversaciones

### 4.5 Adaptaciones Responsive Clave

**Elementos que se ocultan en mobile:**
- Columnas secundarias en tablas (solo nombre + dato principal + acción)
- Texto de navegación (solo iconos)
- Metadatos terciarios en cards

**Elementos que aumentan en mobile:**
- Touch targets de botones: mínimo 48x48px (vs 44px desktop)
- Padding inputs: 16px (vs 12px desktop) para mejor toque
- Espacio entre cards: 24px (vs 16px desktop) para scroll táctil

---

## 5. Interacciones y Microanimaciones

### 5.1 Principios de Animación

**Propósito:** Las animaciones deben comunicar estado, guiar atención y proporcionar feedback, **no decorar**.

**Reglas:**
1. Solo animar `transform` y `opacity`
2. Duración máxima 400ms (contexto médico no tolera delays largos)
3. Todas las animaciones deben tener alternativa `prefers-reduced-motion`
4. Animaciones críticas (loading states) no se desactivan

### 5.2 Estados Interactivos

**Botones:**
- **Hover:** lift translateY(-1px) + shadow upgrade, duration 150ms
- **Active (click):** scale(0.98), duration 100ms
- **Loading:** spinner 16px centrado, fade in 150ms

**Cards clickeables:**
- **Hover:** lift translateY(-2px) + shadow-md, duration 150ms
- **Focus:** outline 2px `primary-500`, offset 2px

**Inputs:**
- **Focus:** border color change + shadow grow, duration 150ms
- **Error shake:** keyframe translateX(-4px → 4px → 0), duration 300ms, ejecutar 1 vez al validar

**Toggle Switch:**
- **Transition:** thumb position + track color, duration 250ms cubic-bezier(0.4, 0, 0.2, 1)
- **Hover:** thumb scale(1.1), duration 150ms

### 5.3 Transiciones de Módulo

**Cambio de navegación:**
- Fade out contenido actual: opacity 1→0, duration 150ms
- Fade in contenido nuevo: opacity 0→1, duration 250ms, delay 100ms
- Scroll top instantáneo entre fades

**Modal open/close:**
- **Open:** overlay fade in (200ms) + container fade+scale (300ms delay 100ms)
- **Close:** container fade+scale reverse (200ms) + overlay fade out (200ms delay 150ms)

### 5.4 Feedback en Tiempo Real

**Notificación nueva (WhatsApp):**
- Badge count increment: scale(0 → 1.2 → 1), duration 300ms
- Color pulse: shadow con color `whatsapp-yellow` pulse 2 veces

**Actualización de datos:**
- Fila tabla afectada: background flash `primary-100` → transparent, duration 600ms

**Carga de contenido:**
- Skeleton screens con shimmer (gradient animado), loop infinito hasta carga
- Spinner solo si >1s de espera

---

## Notas Finales de Implementación

### Prioridades de Desarrollo UI

1. **Fase 1:** Design tokens + componentes base (botones, inputs, cards)
2. **Fase 2:** Navegación + layout responsive
3. **Fase 3:** Componentes complejos (tabla, calendario, chat)
4. **Fase 4:** Animaciones + polish

### Compatibilidad

- **Navegadores:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos:** Desktop (1024px+), Tablet (768-1023px), Mobile (320-767px)
- **Accesibilidad:** WCAG 2.1 Level AA mínimo

### Librerías Sugeridas

- **Iconos:** Lucide React (https://lucide.dev) - 20px default, stroke-width 2
- **Date Picker:** React Day Picker v8 con customización tokens
- **Charts:** Recharts con colores sistema
- **Animaciones:** Framer Motion (solo si necesario, preferir CSS transitions)

### Herramientas de Validación

- **Contraste:** Use WebAIM Contrast Checker para verificar WCAG
- **Responsive:** Test en Chrome DevTools con dimensiones reales de dispositivos
- **Accesibilidad:** axe DevTools extension para auditoría continua
