# Admin Panel Copy Guide

## Files to Copy to Admin Project

### 1. Database Schema
```sql
-- Run this in your admin project database
CREATE TABLE website_ads_config (
  id SERIAL PRIMARY KEY,
  website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
  ads_enabled BOOLEAN DEFAULT true,
  google_adsense_client_id VARCHAR(255),
  google_adsense_slot_id VARCHAR(255),
  ad_placements JSONB,
  ad_frequency INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ads_content (
  id SERIAL PRIMARY KEY,
  website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
  ad_type VARCHAR(50),
  position VARCHAR(50),
  ad_code TEXT,
  is_active BOOLEAN DEFAULT true,
  display_conditions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Copy These Files

#### From User Project:
- `src/lib/ads-config.js` → Copy to admin project
- `src/lib/components/AdsComponent.svelte` → Copy to admin project
- `src/lib/components/AdsPlacement.svelte` → Copy to admin project

#### Admin Panel Files (Copy these):
- `src/routes/admin/+layout.svelte`
- `src/routes/admin/+page.svelte`
- `src/routes/admin/ads/+page.svelte`

### 3. API Endpoints (Optional)
If you want to use API instead of direct database access:
- `src/routes/api/ads/config/+server.js`
- `src/routes/api/ads/content/+server.js`

## How to Use

### 1. Access Admin Panel
- Go to `/admin` in your admin project
- Select website from dropdown
- Configure ads settings
- Add custom ads content

### 2. Ads Configuration
- **Basic Settings**: Enable/disable ads, set Google AdSense IDs
- **Ad Placements**: Configure where ads appear (header, sidebar, content, footer)
- **Ad Frequency**: How often ads should appear

### 3. Ads Content Management
- **Ad Type**: Banner, Sidebar, In-Article, Popup
- **Position**: Header, Sidebar, Content, Footer
- **Ad Code**: HTML/JS code for custom ads
- **Display Conditions**: When to show ads

### 4. Integration in User Project
In your user project, add ads to any page:

```svelte
<script>
  import AdsPlacement from '$lib/components/AdsPlacement.svelte';
</script>

<!-- Add ads anywhere in your template -->
<AdsPlacement 
  websiteId={websiteId}
  placement="header"  <!-- or sidebar, content, footer, in-article -->
  pageData={{ pageType: 'homepage' }}
/>
```

## Features

### ✅ Multi-Website Support
- Manage ads for all 14 websites from one panel
- Per-website configuration
- Easy website switching

### ✅ Google AdSense Integration
- Client ID and Slot ID configuration
- Automatic AdSense script generation
- Responsive ad units

### ✅ Custom Ads Support
- HTML/JS custom ads
- Multiple ad types
- Conditional display

### ✅ Placement Control
- Header, Sidebar, Content, Footer
- In-Article ads
- Flexible positioning

### ✅ Admin Dashboard
- Statistics overview
- Quick actions
- Easy navigation

## Workflow

1. **Admin Setup**: Configure ads for each website
2. **User Experience**: Ads automatically appear on user sites
3. **Management**: Easy updates without code changes
4. **Scaling**: Add new websites without code changes

## Benefits

- ✅ **No Code Changes**: Add ads without touching user project code
- ✅ **Centralized Management**: All ads managed from one place
- ✅ **Per-Website Control**: Different ads for different websites
- ✅ **Easy Updates**: Change ads without deployment
- ✅ **Scalable**: Add new websites easily
- ✅ **Revenue Tracking**: Track ads per website

## Notes

- Admin panel is separate from user project
- User project only displays ads based on configuration
- All ads management happens in admin project
- Database is shared between both projects
- API endpoints available for external management
