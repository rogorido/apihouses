-- para el combo de buscar resoluciones por provincias 

SELECT p.province_id,
       p.name AS province_name,
       COUNT(*) AS total
FROM provinces P
JOIN vistas.provinces_in_resolutions USING (province_id)
GROUP BY p.province_id, p.name
ORDER BY p.name;
