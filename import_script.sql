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
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Kefir Skinny', 'https://www.instagram.com/kefirskinny/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Elaborados','Lácteos']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Corrientes', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Skinny Waffles Gualeguaychu', 'https://www.instagram.com/skinnywafflesgualeguaychu/?hl=es-la', NULL, NULL, NULL, 'Restaurante', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados']::TEXT[], ARRAY[]::TEXT[], '⚠️ Waffles - puede ser solo Restaurante', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Entre Ríos', NULL, 'Guleguaychu', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Alimenta Paraná', 'https://www.instagram.com/alimentaparana/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Entre Ríos', NULL, 'Paraná', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Agroholon', 'https://www.instagram.com/agroholon/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Jujuy', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Verde Lechuza - huerta agroecológica', 'https://www.instagram.com/verdelechuza/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], 'Plantines agroecológicos y eventualmente frutas y verduras', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'La Pampa', NULL, 'Toay', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Pampa Fresca', 'https://www.instagram.com/pampa.fresca/?hl=en', NULL, '2954225018', '2954225018', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], 'Hacen envíos', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'La Pampa', NULL, 'Santa Rosa, Toay, Gral Acha', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Alora Saludable', 'https://www.instagram.com/alora.saludable/', NULL, '2954 809359', '2954 809359', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], 'Hacen envíos', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'La Pampa', NULL, 'Santa Rosa', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Brote Popular', 'https://www.instagram.com/brotepopular/?hl=en', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], 'Se retira en la zona del hospital Lucio Molas', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'La Pampa', NULL, 'Santa Rosa', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Kale Agroecológicos', 'https://www.instagram.com/kaleagroecologicos/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, 'Gran Mendoza', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Vida Feria', 'https://www.instagram.com/vidaferiacano/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, 'Mendoza Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Reparto Alegría', 'https://www.instagram.com/reparto_alegria/?hl=es-la', 'https://linktr.ee/repartoalegria', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, 'Mendoza Ciudad y Gran Mendoza', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Wanka Saludable', 'https://www.instagram.com/wankasaludable/?hl=es-la', NULL, '261 525-6270', '261 525-6270', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, 'Rivadavia, San Martin y Junín, Godoy Cruz, Maipú, Lujan, Las Heras, Guaymallen', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mistica Natural', 'https://www.instagram.com/misticanatural.arg/?hl=es-la', 'https://linktr.ee/misticanatural.arg', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Divina Naturaleza - finca dina', 'https://www.instagram.com/finca.dina/?hl=es-la', NULL, '261 699-9814', '261 699-9814', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Bio Feria', 'https://www.instagram.com/bioferia.mendoza/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Mendoza', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Granja La Lechuza', 'https://www.instagram.com/granjalalechuza/?hl=es-la', 'https://granjalalechuza.com/', NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Huevos']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Misiones', NULL, 'Oberá', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Yvy Tierra Almacen', 'https://www.instagram.com/yvytierra.almacen/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Misiones', NULL, 'Posadas', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Janus', 'https://www.instagram.com/janusbio/?hl=es', NULL, '2995711049', '2995711049', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Neuquén', NULL, 'Contralmirante Cordero', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Egaleco, Canasta agroecológica', 'https://www.instagram.com/egalecosma/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Neuquén', NULL, 'San Martín de los Andes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Organica Flor Dorada', 'https://www.instagram.com/huertaorganicaflordorada/?hl=es-la', 'https://madmimi.com/s/9a8e611', NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Orgánico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Neuquén', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercado Comunitario Bariloche', 'https://www.instagram.com/mercado.comunitario.bariloche/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'Bariloche', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Huerta Amaranthus', 'https://www.instagram.com/huerta.amarantus/', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'El Bolsón, Bariloche', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Chacra Rizoma', 'https://www.instagram.com/chacrarizoma/', NULL, '2944 597984', '2944 597984', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'El Bolsón y alrededores', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Janus Bio', 'https://www.instagram.com/janusbio/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'Contralmirante Cordero', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tierra Caracol', 'https://www.instagram.com/caracoltierra/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'Trevelin', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Vive la Huerta Trevelin', 'https://www.instagram.com/vive_la_huerta__trevelin/?hl=es-la', NULL, NULL, NULL, 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'Trevelin', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Colectivo Agroecologico', 'https://www.instagram.com/colectivoagroecologico/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Río Negro', NULL, 'Viedma, Carmen de Patagones', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Granja Tía Nora', 'https://www.instagram.com/granjatianora/?hl=es-la', NULL, '2644365391', '2644365391', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Huevos']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'San Juan', NULL, 'Albardón', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Huertita SL', 'https://www.instagram.com/lahuertitasl/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'San Luis', NULL, 'San Luis Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Red Viva San Luis', NULL, NULL, '266 457 4533', '266 457 4533', 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], 'Contacto: Cecilia', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'San Luis', NULL, NULL, NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('El Campito Huerta', 'https://www.instagram.com/el.campito.huerta/', NULL, '3402 552-723', '3402 552-723', 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Arroyo Seco y zona', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Broagroecológico', 'https://www.instagram.com/broagroecologico/', NULL, '3496400062', '3496400062', 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Esperanza', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Benjamín Santiago', 'https://www.instagram.com/samtiago.moru/', NULL, '542473-46-9103', '542473-46-9103', 'Productor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Hughes', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Dulces del Jardín', 'https://www.instagram.com/dulcesdeljardinenfunes/', 'https://dulcesdeljardin.mitiendanube.com/', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Elaborados','Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Rosario, Funes, Roldán', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Suelo Común', 'https://www.instagram.com/latiendadesuelocomun/?hl=es', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Rosario', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Trabajo en Tierra Viva', 'https://www.instagram.com/trabajotierraviva/?hl=es', 'https://trabajoentierraviva.mitiendanube.com/', NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Rosario, Granadero Baigorria', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Biodemarg', 'https://www.instagram.com/biodemarg/?hl=es-la', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Rosario', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Vitalia Almacen Natural', 'https://www.instagram.com/vitalia_almacennatural/?hl=es', 'https://vitalia.com.ar/', '341 509-0914', '341 509-0914', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Rosario y Gran Rosario, Villa Gobernador Galvez, El Trebol, San Lorenzo, Casilla I, Firmat, Alvear, Entre Rios, etc.', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Feria Agroecológica Santa Fé', 'https://www.instagram.com/feriaagroecologicasf/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa Fé Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Verdecita 2020', 'https://www.instagram.com/verdecita2020/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa Fé Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('La Huerta Delivery', 'https://www.instagram.com/la_huerta_delivery/', NULL, '342 549-9608', '342 549-9608', 'Abastecedor', ARRAY[]::TEXT[], 'Solo Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa Fé Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Establecimiento la Quinta', 'https://www.instagram.com/establecimientolaquinta/', NULL, NULL, NULL, 'Productor', ARRAY['Abastecedor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos']::TEXT[], ARRAY['Verduras','Frutas']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa Fé Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Tierra Noble', 'https://www.instagram.com/tierranoble.ok/', 'https://linktr.ee/Tierranoble.sf', NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa Fé Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Cosecha Agroecológica', 'https://www.instagram.com/cosecha_agroecologica/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], 'Puesto N°22 en la plaza Pueyrredón. Sábados 8 a 13hs', false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa Fé Capital', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Amma 100 Agroecología', 'https://www.instagram.com/amma100agroecologica/?hl=es-la', NULL, '3425008482/3498400808', '3425008482/3498400808', 'Abastecedor', ARRAY['Productor']::TEXT[], 'Retiro y Entrega', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Santa Fé', NULL, 'Santa fé Capital y la costa', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
DO $m$
DECLARE m_id UUID;
BEGIN
  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)
  VALUES ('Mercadito Agroecológico Tucuman', 'https://www.instagram.com/mercaditoagroecologicotuc/', NULL, NULL, NULL, 'Abastecedor', ARRAY[]::TEXT[], 'Solo Retiro', ARRAY['Sin agroquímicos','Agroecológico','Sustentable']::TEXT[], ARRAY['Verduras','Frutas','Elaborados']::TEXT[], ARRAY[]::TEXT[], NULL, false, false, 'sin_contacto', 'admin', 'active')
  RETURNING id INTO m_id;
  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)
  VALUES (m_id, 'Argentina', 'Tucumán', NULL, 'Yerba Buena', NULL, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);
END $m$;
COMMIT;