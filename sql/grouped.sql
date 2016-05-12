SELECT
  band * {{ bandSize }} AS band,
  ST_AsGeoJSON(ST_Union(geometry))::json AS geometry,
  COUNT(*) AS count
FROM (
  SELECT
    ST_SimplifyPreserveTopology(
      Geometry(
        ST_Buffer(
          Geography(geometry),
          {{ buffer }}
        )
      ),
      {{ simplifyTolerance }}
    ) AS geometry,
    (
      (date_part('year', lower(validsince)) +
      date_part('year', upper(validuntil))) / 2
    )::int / {{ bandSize }} AS band
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
) d
GROUP BY
  band
ORDER BY
  band
