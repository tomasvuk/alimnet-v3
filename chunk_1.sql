BEGIN;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sikkim Orgánico', 'https://www.instagram.com/sikkim.organico/?hl=es-la', NULL, '1521791201', '1521791201', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Castelar, Ituzaingó, Ramos Mejía, Padua, Villa Udaondo, Haedo, San Justo', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('En Respeto con la Naturaleza', 'https://www.instagram.com/enrespetoconlanaturaleza/?hl=es-la', NULL, '11 7369-3206', '11 7369-3206', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Ciudad Evita', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Eres lo que comes', 'https://www.instagram.com/almacen_eresloquecomes/', 'www.eresloquecomes.com.ar', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'De Ramos Mejía hasta Moreno', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Agro Primavera', 'https://www.instagram.com/agroprimavera/', NULL, '1169346341', '1169346341', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Florencio Varela', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Feria Sustentable del Sur', 'https://www.instagram.com/feriasustentabledelsur/', NULL, NULL, NULL, 'Chef', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Adrogué', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Chavo Pastel', 'https://www.instagram.com/chavopastel/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar - podría ser Restaurante', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Avellaneda', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Del Campo a la Mesa Brown', 'https://www.instagram.com/delcampoalamesabrown/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Almirante Brown y toda zona sur', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Brota Orgánico', 'https://www.instagram.com/brotaorganico/', 'https://sites.google.com/view/brotaorganico/inicio', NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Banfield', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Tujillo', 'https://www.instagram.com/huerta_trujillo.06/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'El Pato, Berazategui', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nodo de la UTT Gutierrez', 'https://www.instagram.com/nodo.utt.gutierrez/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], '⚠️ UTT - Nodo', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Berazategui', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Reverdecer Ecotienda Saludable', 'https://www.instagram.com/reverdecer.ecotiendasaludable/', 'https://pency.app/reverdecer', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Bernal, Quilmes, San Fco. Solano, Wilde, CABA', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Red Conciencia en el Sur', 'https://www.instagram.com/red_conciencia_enelsur/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Ezeiza', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Patio de las Rosas', 'https://www.instagram.com/elpatiodelasrosas/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Lomas de Zamora', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Verdores Almacén Vivero', 'https://www.instagram.com/verdores.almacen.vivero/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Lomas de Zamora', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sikkim Orgánico', 'https://www.instagram.com/sikkim.organico/?hl=es-la', NULL, '1556260969', '1556260969', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Lomas de Zamora, Lanús, Banfield, Temperley, Remedios de Escalada, Adrogué, Lavallol, Villa Turdera, Caning, Monte Grande', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nodo Vecinxs de Temperley - Nodo Mercado Territorial', 'https://www.nodovecinxsdetemperley.com.ar/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Lomas de Zamora, Adrogue, Marmol, Birzaco, Temperley', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nodo Tierra Nativa', 'https://www.instagram.com/nodotierranativa/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Adrogué', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Centro Demostrativo ALAS', 'https://www.instagram.com/centrodemostrativoalas/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], '⚠️ Centro demostrativo', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Rafael Calzada', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Biodemarg', 'https://www.instagram.com/biodemarg/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Quilmes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Marea Creciente - Nodo Mercado Territorial', 'https://www.instagram.com/nodo.mareacreciente/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Quilmes oeste, Bernal oeste y centro', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Casita Orgánica', 'https://www.instagram.com/la_casitaorganica/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Lanus Oeste', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Buena Cosecha', 'https://www.instagram.com/buenacosecha_/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'Quilmes, Berazategui y alrededores', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Paladar Divino Alimentos', 'https://www.instagram.com/paladardivinoalimentos/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Cabaña, Agro Orgánic', 'https://www.instagram.com/holacanningnatural/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mi Huerta Org', 'https://www.instagram.com/mihuertaorg/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Bolsón Colaborativo', 'https://www.instagram.com/bolsoncolaborativo/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Alimentos Naturales Q''umara', 'https://www.instagram.com/alimentosnaturalesqumara/', 'https://linktr.ee/tiendanaturalqumara', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Agro Primavera', 'https://www.instagram.com/agroprimavera/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Agroecológicos MG', 'https://www.instagram.com/agroecologicosmg/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Organicadrogue', 'https://www.instagram.com/organicadrogue/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Chef']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', 'José Marmol, Adrogue, Rafael Calzada, Burzaco, Longchamps, Turdera, Luis Guillón, Llavallol, Monte Grande, Temperley, Lomas de zamora, Banfield, Remedios de Escalada, Lanús', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sur Cocina y Rizoma', 'https://www.instagram.com/surcocinayrizoma/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Restaurante']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Sur', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Pai', 'https://www.instagram.com/lapai.ecoproveeduria/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], 'Solo los VIERNES de 17 a 19 HS', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Chapadmalal', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Casa Agua', 'https://www.instagram.com/la_peperia_mdc/', NULL, '2235264381', '2235264381', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar Chiquita, La Caleta', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Che Verde', 'https://www.instagram.com/cheverde.mdp/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cooperativa Productores Agroecológicos', 'https://www.instagram.com/productoresagroecologicosmdp/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('De Rebrote', 'https://www.instagram.com/derebrote/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Botes Orgánicos', 'https://www.instagram.com/brotesorganicos/', NULL, '2236189548', '2236189548', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Burubio Veggie', 'https://www.instagram.com/burubioveggie/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Verdu Style', 'https://www.instagram.com/laverdustyle/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Campos Silvestre MDQ', 'https://www.instagram.com/camposilvestremdq/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tu Raiz Alimentos', 'https://www.instagram.com/turaiz.alimentos/', 'http://www.turaiz.com.ar/#!/categoria/0/pagina/0/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Feria Verde Mar del Plata', 'https://www.instagram.com/feriaverdemdp/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Estación Gourmet Almacén', 'https://www.instagram.com/estaciongourmetalmacen/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Armonía Alimentos Saludables', 'https://www.instagram.com/armonia.alimentos.saludables/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Los Serenos', 'https://www.instagram.com/huertalosserenos/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacen Aurelia', 'https://www.instagram.com/almacen.aurelia/', 'https://almacenaurelia.mitiendanube.com/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Luz en el Paraiso de Teresita', 'https://www.instagram.com/luzenelparaisodeteresita/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Mar del Plata, Chapadmalal', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Feria Verde Miramar', 'https://www.instagram.com/feriaverdemiramar/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Miramar', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Viejas Raíces', 'https://www.instagram.com/viejas.raices/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Necochea Quequén', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cheverde mdp', 'https://www.instagram.com/cheverdemdp/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Costa Atlántica', 'Santa Clara del Mar', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
COMMIT;