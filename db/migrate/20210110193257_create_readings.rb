class CreateReadings < ActiveRecord::Migration[6.1]
  def change
    create_table :readings do |t|
      t.float :air_temperature
      t.float :water_temperature
      t.float :humidity
      t.float :total_dissolved_solids
      t.float :ph_level

      t.timestamps
    end
  end
end
