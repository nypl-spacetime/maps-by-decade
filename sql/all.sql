SELECT
  id,
  name,
  (data->>'nyplUrl')::text,
  (data->>'nyplDigitalId')::text,
  date_part('year', lower(validsince)) AS validsince,
  date_part('year', upper(validuntil)) AS validuntil,
  (
    (date_part('year', lower(validsince)) +
    date_part('year', upper(validuntil))) / 2
  )::int / {{ bandSize }} * {{ bandSize }} AS band,
  json_build_array(
    ST_XMin(geometry),
    ST_YMin(geometry),
    ST_XMax(geometry),
    ST_YMax(geometry)
  ) AS boundingbox,
  ST_AsGeoJSON(Geometry(
    ST_Buffer(Geography(ST_SimplifyPreserveTopology(geometry, {{ simplifyTolerance }})), {{ buffer }})
  ))::json AS geometry
FROM
  pits
WHERE
  dataset = 'mapwarper' AND
  ST_Contains(ST_Envelope(
    ST_SetSRID(ST_MakeLine(
      ST_MakePoint({{ boundingBox.minLon }}, {{ boundingBox.minLat }}),
      ST_MakePoint({{ boundingBox.maxLon }}, {{ boundingBox.maxLat }})), 4326)
  ), geometry) AND
  (data->>'masked')::boolean = true AND
  daterange('{{ yearMin }}-01-01', '{{ yearMax }}-12-31') @> validsince AND
  daterange('{{ yearMin }}-01-01', '{{ yearMax }}-12-31') @> validuntil AND
  ST_Area(Geography(geometry)) < {{ minArea }}
