json.extract! reading, :id, :air_temperature, :water_temperature, :humidity, :total_dissolved_solids, :ph_level, :created_at, :updated_at
json.url reading_url(reading, format: :json)
