namespace :hydrobot do

  task pull_data: :environment do
    #require 'rubyserial'
    serialport = Serial.new '/dev/cu.usbmodem14301'
    #just read forever
    while true do
      while (row = serialport.gets.chomp) do       # see note 2
        next if row.split(',').first.split('.').size > 2
        parts = row.split(',')
        reading = Reading.create(air_temperature: parts[0].to_f,
                              humidity: parts[1].to_f,
                              total_dissolved_solids: parts[2].to_f,
                              water_temperature: parts[3].to_f,
                              ph_level: parts[4].to_f
                             )
        puts reading.inspect
      end
    end

    serialport.close
  end
end
