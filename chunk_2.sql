BEGIN;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacen Orgánico Arrecifes', 'https://www.instagram.com/almacenorganico.arrecifes/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Arrecifes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Tonantzin Fruteria', 'https://www.instagram.com/latonantzinfruteria/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Frutas','Verduras','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Bahía Blanca', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Celtistala Almacén Orgánico', 'https://www.instagram.com/celtistala/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Berisso', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Chacra el Jahuel', 'https://www.instagram.com/chacraeljahuel/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Bragado', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cultivos Catalpa', 'https://www.instagram.com/cultivoscatalpa/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Bragado', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Maclura Agroecología', 'https://www.instagram.com/maclura_agroecologia/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Capitan Sarmiento', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('De la Huerta a tu Casa', 'https://www.instagram.com/delahuertaatucasa/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Exaltación de la Cruz', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Quinta del Abuelo', 'https://instagram.com/laquinta.delabuelo', NULL, '2945417140', '2945417140', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Huevos']::TEXT[], ARRAY[]::TEXT[], 'WhatsApp - tienen huevos', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'General Belgrano', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nave Prooveduria Vegana', 'https://www.instagram.com/nave.proveeduriavegana/', NULL, '11 22718919', '11 22718919', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Glew', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Hola Sabor', 'https://www.instagram.com/hola_sabor/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Hudson', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cultivarte Orgánico', 'https://www.instagram.com/cultivarte_organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Junin', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mora Organic', 'https://www.instagram.com/mora.organic/', NULL, '221 563-1432', '221 563-1432', 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Más rizomas', 'https://www.instagram.com/masrizomas/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta orgánica Nueva Era', 'https://www.instagram.com/huerta_organica_nueva_era/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Biodemarg', 'https://www.instagram.com/biodemarg/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cutura Alimentaria LP', 'https://www.instagram.com/culturaalimentarialp/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Los Teros Ecohuerta', 'https://www.instagram.com/lostereosecohuerta/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Agro Eco Moon', 'https://www.instagram.com/agroecomoon/?hl=es-la', 'https://bit.ly/3nz7zP7', NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Monarca Almacen organico', 'https://www.instagram.com/monarca.almacenorganico/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Más Rizomas', 'https://www.instagram.com/masrizomas/', NULL, '2215346770', '2215346770', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Mercadito Gonnet', 'https://www.instagram.com/elmercadito.gonnet/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Ayni Coope', 'https://www.instagram.com/ayni_coope/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Restaurante']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Somos Tierra Verde', 'https://www.instagram.com/somostierraverde/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Vuelta a las Tierra Huerta Familiar', 'https://www.instagram.com/vueltaalatierrahuertafamiliar/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nutrisano', 'https://www.instagram.com/nutrisanolp/?utm_medium=copy_link', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'La Plata, Gonnet, City Bell, Villa Elisa', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nave Tierra Lobos', 'https://www.instagram.com/navetierralobos/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Lobos', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Colonia UTT Luján', 'https://www.instagram.com/colonia_utt_lujan/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], '⚠️ UTT Colonia', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Luján', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Buenazas de Luján', 'https://www.facebook.com/BuenezasDeLujan/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Luján', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta el Origen', 'https://www.instagram.com/huertaeorigen/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Mercedes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Sustentable Mercedes', 'https://www.instagram.com/mercado_sustentable_mercedes/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Mercedes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Pura Vida Mercedes', 'https://www.instagram.com/puravidamercedes/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Mercedes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Planto Hortalizas Orgánicas', 'https://www.instagram.com/plantohortalizasorganicas/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Mercedes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Vuelta al Campo', 'https://www.instagram.com/vuelta_al_campo/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'San Nicolás', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tapo Orgánico', 'https://www.instagram.com/tapo.organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'San Pedro', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Con los Pies en la Tierra', 'https://www.instagram.com/con.los.pies.en.la_tierra/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Chef']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Tandil y alrededores', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Trattoria TL', 'https://www.instagram.com/latrattoriatl/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Restaurante']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Trattoria - puede ser Restaurante principal', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Trenque Lauquen', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mamushka Cocina Amor', 'https://www.instagram.com/mamushka.cocina.amor/?hl=es-la', NULL, NULL, NULL, 'Restaurante', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Trenque Lauquen', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Ñangapirí. Mercadito Soberano', 'https://www.instagram.com/niangapirimercadito/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Villa de Mayo, Malvinas Argentinas', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('VPV Nodo UTT', 'https://www.instagram.com/vpv.nodoutt/', NULL, '11 5771-4589', '11 5771-4589', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ UTT Nodo', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Provincia', 'Villa Pueyrredón', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacenata', 'https://www.instagram.com/almacenata/', 'www.almacenata.com.ar/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacenutт', 'https://www.instagram.com/almacenutt/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Amazen Tienda Orgánica', 'https://www.instagram.com/almazentiendaorganica_/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Biodemarg', 'https://www.instagram.com/biodemarg/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Biomarket Orgánico', 'https://www.instagram.com/biomarketorganico/', 'https://biomarket.com.ar/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Caracoles y Hormigas', 'https://www.instagram.com/caracolesyhormigas/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], 'Consultar zonas de entrega', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Come bien BA', 'https://www.instagram.com/comebienba/?hl=es-la', NULL, '11 6558-1710', '11 6558-1710', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cultivarte Orgánico', 'https://www.instagram.com/cultivarte_organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Bolsón Orgánico', 'https://www.instagram.com/elbolson_organico/', 'https://linktr.ee/Elbolsonorganico', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Cajoncito', 'https://www.instagram.com/el.cajoncito/', 'https://www.elcajoncito.org/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Click Bolsones', 'https://www.instagram.com/elclickbolsones/', 'https://bit.ly/2ZtmwKf', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
COMMIT;