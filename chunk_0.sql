BEGIN;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacén Nuevo Mundo', 'https://www.instagram.com/almacennuevomundo/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Boulogne', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Trama Almacen', 'https://www.instagram.com/trama_almacen/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Campana, Zarate', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Medallon Vegetariano', 'https://www.instagram.com/medallonvegetariano/?hl=es-la', NULL, '11 3557 5142', '11 3557 5142', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados','Panificados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Del Viso', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mas Organicos', 'https://www.instagram.com/masorganicos/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'El Talar, Pacheco', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cooperativa Paraisa', 'https://www.instagram.com/cope_paraisa/?hl=es-la', 'https://bit.ly/3vToYWq', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Escobar, Maschwitz', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Grande', 'https://www.instagram.com/huerta.grande/?hl=es-la', NULL, '1140457369', '1140457369', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Escobar, Maschwitz', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Las Garzas', 'https://www.instagram.com/agroecologialasgarzas/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Escobar, Maschwitz', 'Chacho Peñaloza 1619, local 2, Maschwitz', 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta del Tomate', 'https://www.instagram.com/deltomate2021/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Escobar, Maschwitz', 'Mermoz norte 2433, Escobar', 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Agricultura Sanadora - Granja La Cañada', 'https://www.instagram.com/agricultura.sanadora/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Escobar, Maschwitz', 'La Cañada esquina Mermoz, Escobar', 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Sentido Común Red', 'https://www.instagram.com/sentido_comunred/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Fátima, Manzanares, Tortuguitas, Mathew, Pilar, Zelaya', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Camino Orgánico', 'https://www.instagram.com/camino.organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Exaltación de la Cruz, Cardales, Campana, Zárate, Maswich, Escobar, Pilar, Moreno', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Fronda BIO', 'https://www.instagram.com/frondabio/?hl=es-la', NULL, '1533443474', '1533443474', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Florida', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Alma Serena', 'https://www.instagram.com/laalmaserena/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Martinez', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Verde Lino Dietética', 'https://www.instagram.com/verdelinodietetica/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Martinez', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Choza', 'https://www.instagram.com/tiendalachoza/', 'http://lachoza.com.ar/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Martinez', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacen Tierra Negra', 'https://www.instagram.com/almacentierranegra/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Martinez', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta a tu Casa', 'https://www.instagram.com/huerta_atucasa/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Martinez', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacen Florios', 'https://www.instagram.com/almacenflorios/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Palomar', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Nodo de Olga - Mercado Territorial', 'https://www.instagram.com/el_nodo_de_olga/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Olivos, Florida, Martínez, La Lucila', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Chinampas Natural', 'https://www.instagram.com/chinampasnatural/', NULL, '11 6272-5449', '11 6272-5449', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Pilar', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Madre', 'https://www.instagram.com/huertamadre/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Pilar y Zona Norte', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Genjibre Orgánico', 'https://www.instagram.com/genjibreorganico/?hl=es-la', 'https://linktr.ee/GenjibreOrganico', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Pilar, Benavidez, Villanueva, Nordelta', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Como Siempre Orgánico', 'https://www.instagram.com/comosiempreorganico/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Pilar, Campana, Zarate', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Amaranto Cooperativas', 'https://www.instagram.com/amaranto/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Pilar, Campana, Zarate', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Germinar ONG', 'http://instagram.com/germinarong/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY['ONG']::TEXT[], '⚠️ ONG - evaluar si corresponde incluir', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'San Fernando', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Proveeduría Orgánica', 'https://www.instagram.com/laproveeduriaorganica/', NULL, '11 6008-7347', '11 6008-7347', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'San Isidro y Alrededores', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Alas de Tigre', 'https://www.instagram.com/alas_de_tigre/?hl=es-la', 'https://alasdetigre.wixsite.com/alasdetigre', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Tigre', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Grande', 'https://www.instagram.com/huerta.grande/?hl=es-la', NULL, '1140457369', '1140457369', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Tigre, San Fernando', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Medallon Vegetariano', 'https://www.instagram.com/medallonvegetariano/?hl=es-la', NULL, '11 3557 5142', '11 3557 5142', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Tortuguitas', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Come bien BA', 'https://www.instagram.com/comebienba/?hl=es-la', NULL, '11 6558-1710', '11 6558-1710', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Vicente Lopez, San Isidro, Tigre, El Talar, San Fernando, Nordelta', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Caracoles y Hormigas', 'https://www.instagram.com/caracolesyhormigas/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Villa Adelina, Maschwitz', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Ayni Cocina', 'https://www.instagram.com/ayni_cocina/', NULL, '11 5322-7151', '11 5322-7151', 'Abastecedor', ARRAY['Restaurante']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Villa Ballester', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Isla Florida', 'instagram.com/laislaflorida/', NULL, '1161503097', '1161503097', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Villa Martelli', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Almacén Ciruela', 'https://www.instagram.com/almacenciruela/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', 'Bella Vista, Muñiz, San Miguel, José C Paz', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('De Bio Market', 'https://www.instagram.com/debiomarket/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta la Anunciación', 'https://www.instagram.com/huertalaanunciacion/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Red Rizoma', 'https://www.instagram.com/redrizoma/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Nuestra Tierra Orgánicos', 'https://www.instagram.com/nuestratierraorganicos/', NULL, NULL, NULL, 'Restaurante', ARRAY['Chef']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Solaz', 'https://www.instagram.com/elsolaz/', NULL, '11 4417-2311', '11 4417-2311', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Monteverde', 'https://www.instagram.com/monteverdeverdu/?hl=es-la', NULL, '11 3424-5233', '11 3424-5233', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tierra Organicos', 'https://www.instagram.com/tierraorganicos/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Red Orgánica', 'https://www.instagram.com/redorganica/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Revisar', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Norte', NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('MadreSol', 'https://www.instagram.com/madresol_organica/', NULL, '1139026360', '1139026360', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Ramos Mejia, Ciudadela', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Transformador', 'https://www.instagram.com/mercadotransformador/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Haedo, Ramos Mejía, Ciudadela, Villa Luzuriaga, San Justo, La Tablada, Tapiales, Morón, Casanova, Rafael Castillo, Castelar, Palomar, Caseros, Santos Lugares, Bella Vista, Hurlingam, Martín Coronado, Villa Udaondo, Parque Leloir, Ituzaingó, Merlo, Moreno, Fco Alvarez, Gral Rodriguez, Mariano Acosta, Marcos Paz, San Miguel, José c. Paz, Trujui, Quilmes, Berasategui, Avellaneda, Lanús', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Morón Surco', 'https://www.instagram.com/moron.surco/', NULL, '011 2400-8507', '011 2400-8507', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], 'Grupo WhatsApp: https://chat.whatsapp.com/DOa4Ak9uLZIE7pFiJAqIG4', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Morón', 'Stevenson 2355, Castelar', 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cultivarte Orgánico', 'https://www.instagram.com/cultivarte_organico/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Ramos Mejia', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Orgánico MyM', 'https://www.instagram.com/organicomym/', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'San Justo, Ramos Mejía, Morón, Lomás del Mirador, Villa Luzuriaga, Haedo, Isidro Casanova', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('BioPandora Mercado Agroecológico', 'https://www.instagram.com/bio.pandora/', 'www.biopandora.com.ar', NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico','Sustentable','Demeter']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Ramos Mejia, Lomas del Mirador, Villa Luzuriaga, San Justo, Tapiales, Tablada, Morón, Castelar, Ituzingo, Haedo, Mataderos, Ciudadela, Liniers, Villa Real, Floresta, Flores', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Demeter Alimento Vital', 'https://www.instagram.com/demeter.alimentovital/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY['Demeter']::TEXT[], 'Certificación Demeter posible', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Bellavista, Muñiz, San Miguel', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Almacen Orgánico', 'https://www.instagram.com/elalmacenorganico/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Orgánico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Buenos Aires', 'Zona Oeste', 'Bellavista, San Miguel', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
COMMIT;