BEGIN;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Galpón Agroecológico', 'https://www.instagram.com/elgalpon.agroecologico/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta la Anunciación', 'https://www.instagram.com/huertalaanunciacion/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Indira Alimentos Conscientes', 'https://www.instagram.com/indiraalimentosconscientes/?hl=es-la', 'https://indiraalimentos.mitiendanube.com/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Iriarte Verde', 'https://www.instagram.com/iriarteverde/?hl=es-la', 'http://iriarteverde.com.ar/', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Jardín Orgánico', 'https://www.instagram.com/jardin_organico/', 'https://www.jardinorganico.com.ar/', NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Korindo Natural y Orgánico', 'https://www.instagram.com/korindo_natural_y_organico/', NULL, '4553 6122', '4553 6122', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Agroecológica', 'https://www.instagram.com/laagroecologica/', 'https://linktr.ee/laagroecologica', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Chapanay', 'https://www.instagram.com/lachapanayorganiconatural/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Comunidad Orgánica', 'https://www.instagram.com/lacomunidadorganica/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Huerta Orgánica', 'https://www.instagram.com/lho.arg/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Orgánica Delivery', 'https://www.instagram.com/laorganicadelivery/', 'https://www.laorganicadelivery.com/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Las Chapas Ecoagro', 'https://www.instagram.com/laschapas_ecoagro/?hl=es-la', NULL, '11 4148-8880', '11 4148-8880', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mapo Orgánicos', 'https://www.instagram.com/mapo_organicos/', 'https://linktr.ee/Mapo.organicos', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Más Cerca es Más Justo', 'https://www.instagram.com/mascercaesmasjusto/', 'https://linktr.ee/mascercamasjusto', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Medio Campo Orgánico', 'https://www.instagram.com/mediocampo.organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Bonpland', 'https://instagram.com/mercado.bonpland', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], 'Espacio de comercialización de la Economía Solidaria', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Punto Verde', 'https://www.instagram.com/mercadopuntoverde/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Territorial', 'https://www.instagram.com/mercado.territorial/?hl=en', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Transformador', 'https://www.instagram.com/mercadotransformador/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Punto Orgánico', 'https://www.instagram.com/punto.organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sanas Costumbres', 'https://www.instagram.com/sanas_costumbres/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Semilleros de Estrellas', 'https://www.instagram.com/semillerodeestrellas_/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], '⚠️ Semilleros', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sinergía Ecoalmacen', 'https://www.instagram.com/sinergia.ecoalmacen/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Somos Nueva Tierra', 'https://www.instagram.com/somosnuevatierra/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sumak Coooperativa de Consumo', 'https://www.instagram.com/sumakalmacencooperativo/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tallo Verde', 'https://www.instagram.com/talloverde.organico', 'https://www.talloverde.com/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Ciudad Autónoma de Buenos Aires', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tierra Orgánica', 'https://www.instagram.com/tierraorganicaarg/', 'https://linktr.ee/tierraorganicaarg', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
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
  VALUES (m_id, 'Argentina', 'Chaco', NULL, 'Resistencia', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Alimentos con el Alma', 'https://www.instagram.com/alimentos_con_alma/', 'https://linktr.ee/AlimentosconAlma', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Chubut', NULL, 'Rawson, Gaiman, Trelew, Playa Unión, Puerto Madryn', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado de la Tierra Amboy', 'https://www.instagram.com/mercadodelatierra.amboy/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Amboy', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Yuyupa Córdoba', 'https://www.instagram.com/yuyupa_cordoba/?hl=es-la', 'https://linktr.ee/yuyupacordoba', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Arguello', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Bioterra Orgánicos', 'https://www.instagram.com/bioterra.organicos/', NULL, '3576 65-1776', '3576 65-1776', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Arroyito', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Feria Agroecológica CBA', 'https://www.instagram.com/feriaagroecologicacba/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Córdoba Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Gratiam Orgánicos', 'https://www.instagram.com/organicos_gratiam/?hl=es', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Córdoba Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Orgánicos de mi tierra', 'https://www.instagram.com/Organicosdemitierra/', NULL, '0351 515-9199', '0351 515-9199', 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Córdoba Capital', 'Rafael Núñez 5824 / Ayacucho 486 / Urquiza 2501', 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Y otras yerbas', 'https://www.instagram.com/_y_otras_yerbas_/?hl=es-la', NULL, '351 701-2770', '351 701-2770', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Córdoba', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Paisano Almacen', 'https://www.instagram.com/paisanoalmacen/?hl=es-la', NULL, '3513165968', '3513165968', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Córdoba Capital - Bario Alta Córdoba', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Ramona mercado autogestivo', 'https://www.instagram.com/ramonamercadoautogestivo/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras']::TEXT[], ARRAY[]::TEXT[], 'Dietética, no vi bolsón', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Córdoba Capital - Barrio Güemes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Wahe Guru Sustentable', 'https://www.instagram.com/waheguru.sustentable/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Embalse de Calambuchita', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Destino Verdes', 'https://www.instagram.com/destinoverdes/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Los Reartes, Valle de Calmbuchita', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Reina Mora', 'https://www.instagram.com/reina.mora.natural/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Nono, Traslsierra', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Valle Sagrado Chacra Agroecológica', 'https://www.instagram.com/vallesagrado_chacragroecologic/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Potrero de Garay', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Productor Lucamaría', 'https://www.instagram.com/productoralucamaria/?hl=es-la', NULL, '351 226-5403', '351 226-5403', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Río Segundo, Río Tercero, Oncativo, Pilar y Laguna Larga', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Las Abejas', 'https://www.instagram.com/huerta_las_abejas/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Valle de Punilla', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mascabo Organico', 'https://www.instagram.com/mascaborganicos/', NULL, '3512410852', '3512410852', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Villa Allende, Zona Norte, Sierras Chicas hasta Unquillo', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('All Natural VGB', 'https://www.instagram.com/allnaturalvgb/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Villa General Belgrano', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Feria Agroecológica VGB', 'https://www.instagram.com/feriaagroecologicavgb/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Villa General Belgrano, Valle de Calambuchita', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('De La Pacha Huerto', 'https://www.instagram.com/delapachahuerto/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Plantas medicinales']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Córdoba', NULL, 'Villa María', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Subtropical Vivarium', 'https://www.instagram.com/subtropical_vivarium/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Vivarium - revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Corrientes', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Naturveda Corrientes', 'https://www.instagram.com/naturvedacorrientes/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Corrientes', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
COMMIT;