# Design Spec: Smart Radar & Referents System (Alimnet v3)

Enhance the user dashboard by unifying social interactions into a single "Smart Radar" and operationalizing the "Referents" management system to build a network of trust.

## 1. System Architecture

### 1.1 Data Model (Supabase Integration)
*   **Radar Feed Data**:
    *   `merchants` (via `merchant_validations`): To populate "Validados".
    *   `merchants` (via `user_saved_merchants`): To populate "Mi Selección".
    *   `merchants` (via `created_by`): To populate "Contribuciones".
*   **Social Graph**:
    *   `follows`: Stores relationships between the user (`follower_id`) and their referents (`following_id`).
*   **Calculated Metrics**:
    *   `Referent Count`: For each merchant card, count how many of the user's followed referents have also validated that merchant.

## 2. Components & UI Design

### 2.1 The Smart Radar (Unified Feed)
*   **Layout**: A header with the title "Mi Radar", a horizontal scrollable container of "Smart Pills" at the top, followed by a vertical list of minimalist cards.
*   **Smart Pills (Filters)**:
    *   Shape: Fully rounded (999px border-radius).
    *   Style: Active vs Inactive based on `activeFilter` state.
    *   Labels & Icons (Lucide):
        *   "Todos": Show all combined items.
        *   "Mi Selección 🧺": Uses `ShoppingBasket` icon. Filter by `user_saved_merchants`.
        *   "Por Conocer 📍": Uses `MapPin` icon. Filter by a specific metadata or status (TBD).
        *   "Validados 🛡️": Uses `ShieldCheck` icon. Filter by `merchant_validations`.
        *   "Contribuciones 🤝": Uses `Share2` icon (Community recommendations).

### 2.2 Minimalist Interaction Cards
*   **Design**: Mimic the map's floating card style refined for a list view.
*   **Header**: Business Name (Bold, `#2D3A20`) + Status Badge (e.g., "VALIDADO", "SELECCIÓN").
*   **Body**: Locality + Category (Small, grey).
*   **Stats Row**:
    *   Metric 1: `ShieldCheck` + Community validation count.
    *   Metric 2: `Users` + Count of followed referents who trust this merchant.

### 2.3 Referents Management Tab
*   **List View**: Grid of user profiles.
*   **Profile Card**: Avatar, Full Name, Role (e.g., "MIEMBRO FUNDADOR").
*   **Actions**: "Ver Perfil", "Quitar Referente".
*   **Search**: Ability to search for new referents in the community (Future phase).

## 3. Visual & Aesthetic Rules
*   **Colors**: Strictly adhere to Alimnet Palette (`#2D3A20`, `#5F7D4A`, `#F0F4ED`).
*   **No Emojis**: Replace all emojis with themed Lucide icons.
*   **Tone**: Avoid "Following", "Like", "Followers". Use "Referentes", "Selección", "Comunidad".

## 4. Technical Constraints
*   **Performance**: Optimize the combined query to fetch all interaction types in parallel.
*   **Loading States**: Use skeleton loaders that match the minimalist card shape to prevent layout shift.
*   **Security**: Ensure RLS policies allow users to see their own saves and the public validations of others.

## 5. Success Criteria
*   Users can see all their trusted merchants in one place without switching tabs.
*   The "Referents" count on merchant cards provides immediate personal trust validation.
*   The build remains stable on Vercel (`v0.0.4` and beyond).
