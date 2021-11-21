SELECT DISTINCT house_id, h.name as casa, h.men, pr.name as province, 
       p.longitude, p.latitude,
       h.advocation, h.date_foundation, h.type_house, p.place
FROM houses h
     JOIN places p using (place_id)
     join provinces pr using(province_id)
WHERE h.men = TRUE;
