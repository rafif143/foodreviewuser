# Dynamic Favicon Implementation

## Overview
Favicon website sekarang dinamis dan mengambil data dari kolom `logo_url` di tabel `websites` di database.

## Implementation Details

### 1. SEOHead Component Updates
- **File**: `src/lib/components/SEOHead.svelte`
- **Changes**:
  - Added `websiteData` prop untuk menerima data website
  - Added dynamic favicon logic menggunakan `websiteData?.logo_url`
  - Added fallback ke `/favicon.svg` jika `logo_url` null
  - Updated schema markup untuk menggunakan logo dinamis

### 2. Page Updates
Updated semua halaman yang menggunakan SEOHead component:
- `src/routes/[slug]/+page.svelte` (Homepage)
- `src/routes/[slug]/article/[articleSlug]/+page.svelte` (Article pages)
- `src/routes/[slug]/food/+page.svelte` (Food category)
- `src/routes/[slug]/cafe/+page.svelte` (Cafe category)
- `src/routes/[slug]/events/+page.svelte` (Events category)
- `src/routes/[slug]/recipe/+page.svelte` (Recipe category)
- `src/routes/[slug]/things-to-do/+page.svelte` (Things to do category)
- `src/routes/+page.svelte` (Root page)

### 3. Fallback Favicon
- **File**: `static/favicon.svg`
- **Description**: SVG favicon dengan desain sederhana (red square dengan white pattern)
- **Usage**: Digunakan sebagai fallback ketika `logo_url` null

## How It Works

1. **Data Flow**:
   ```
   Database (websites.logo_url) → Page Data → SEOHead Component → Browser Tab
   ```

2. **Favicon Types Supported**:
   - SVG (preferred)
   - PNG
   - ICO
   - Any image format supported by browsers

3. **Fallback Logic**:
   - If `websiteData.logo_url` exists → Use database logo
   - If `websiteData.logo_url` is null → Use `/favicon.svg`

## Usage Example

```svelte
<SEOHead 
  {websiteId}
  pageType="homepage"
  customTitle="Page Title"
  websiteData={data.website}  <!-- Pass website data with logo_url -->
/>
```

## Database Schema
The `websites` table should have a `logo_url` column:
```sql
ALTER TABLE websites ADD COLUMN logo_url TEXT;
```

## Benefits
- ✅ Dynamic favicon per website
- ✅ Automatic fallback handling
- ✅ SEO-friendly (proper meta tags)
- ✅ Cross-browser compatibility
- ✅ Mobile device support (apple-touch-icon)
