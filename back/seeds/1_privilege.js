/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('privilege').del()
  await knex('privilege').insert([
    { privilege: "SUADMIN", description: 'description admin' },
    { privilege: "SUADMINRH", description: 'description SUADMINRH' },
    { privilege: "testt", description: 'description design' },
    { privilege: "tesstt", description: 'description config' }
    
  ])
  await knex('users').insert([
    { privilege: "SUADMIN", username: 'adminA',"password": "$2a$10$I0aARcnKuvL0GD6/1B3lzuvoyPR2nffdr0LePjQGdhf.QazsBazbS",name:"haddad",lastname:"RAFIK",description:" USER ADMIN" },
  ])
  // await knex('gateways').insert([
  //   {
  //     name: 'Gateway 1',
  //     address_ip: '192.168.1.1',
  //     address_mac: '00:11:22:33:44:55',
  //     location: 'B A, F 1',
  //     model: 'Model X',
  //     type: 'Type A',
  //     Gateway_manufacturer: 'Manufacturer A',
  //     installation_date: '2023-01-15',
  //     last_maintenance_date: '2024-03-20',
  //     description: 'Gateway for network connectivity',
  //     status: 'Active',
  //     created_at: '2024-04-02T08:00:00.000Z',
  //     updated_at: '2024-04-02T08:00:00.000Z'
  //   },
  //   {
  //     name: 'Gateway 2',
  //     address_ip: '192.168.1.2',
  //     address_mac: '00:11:22:33:44:56',
  //     location: 'B A, F 2',
  //     model: 'Model Y',
  //     type: 'Type B',
  //     Gateway_manufacturer: 'Manufacturer B',
  //     installation_date: '2023-02-20',
  //     last_maintenance_date: '2024-03-25',
  //     description: 'Gateway for security monitoring',
  //     status: 'Inactive',
  //     created_at: '2024-04-02T08:00:00.000Z',
  //     updated_at: '2024-04-02T08:00:00.000Z'
  //   },
  //   {
  //     name: 'Gateway 3',
  //     address_ip: '192.168.1.3',
  //     address_mac: '00:11:22:33:44:57',
  //     location: 'B BI',
  //     model: 'Model Z',
  //     type: 'Type C',
  //     Gateway_manufacturer: 'Manufacturer C',
  //     installation_date: '2023-03-10',
  //     last_maintenance_date: '2024-03-28',
  //     description: 'Gateway for data analytics',
  //     status: 'Error',
  //     created_at: '2024-04-02T08:00:00.000Z',
  //     updated_at: '2024-04-02T08:00:00.000Z'
  //   },
  //   {
  //     name: 'Gateway 4',
  //     address_ip: '192.168.1.4',
  //     address_mac: '00:11:22:33:44:58',
  //     location: 'B C, F 3',
  //     model: 'Model A',
  //     type: 'Type D',
  //     Gateway_manufacturer: 'Manufacturer D',
  //     installation_date: '2023-04-05',
  //     last_maintenance_date: '2024-04-01',
  //     description: 'Gateway for IoT devices',
  //     status: 'Maintenance',
  //     created_at: '2024-04-02T08:00:00.000Z',
  //     updated_at: '2024-04-02T08:00:00.000Z'
  //   },
  //   {
  //     name: 'Gateway 5',
  //     address_ip: '192.168.1.5',
  //     address_mac: '00:11:22:33:44:59',
  //     location: 'B D, F 4',
  //     model: 'Model B',
  //     type: 'Type E',
  //     Gateway_manufacturer: 'Manufacturer E',
  //     installation_date: '2023-05-20',
  //     last_maintenance_date: '2024-03-15',
  //     description: 'Gateway for communication',
  //     status: 'Active',
  //     created_at: '2024-04-02T08:00:00.000Z',
  //     updated_at: '2024-04-02T08:00:00.000Z'
  //   }

  // ])

  // await knex('sensors').insert([
  //   {
  //     name: 'Sensor 1',
  //     address_ip: '192.168.1.101',
  //     address_mac: '00:11:22:33:44:61',
  //     location: 'TDY A',
  //     model: 'Model X',
  //     type: 'Type A',
  //     measurement_unit: 'Celsius',
  //     Thresholds_min: 0,
  //     Thresholds_max: 100,
  //     sensor_manufacturer: 'Manufacturer A',
  //     installation_date: '2023-01-15',
  //     last_maintenance_date: '2024-03-20',
  //     description: 'Temperature sensor',
  //   },
  //   {
  //     name: 'Sensor 2',
  //     address_ip: '192.168.1.102',
  //     address_mac: '00:11:22:33:44:62',
  //     location: 'TDY B',
  //     model: 'Model Y',
  //     type: 'Type B',
  //     measurement_unit: 'Percentage',
  //     Thresholds_min: 20,
  //     Thresholds_max: 80,
  //     sensor_manufacturer: 'Manufacturer B',
  //     installation_date: '2023-02-20',
  //     last_maintenance_date: '2024-03-25',
  //     description: 'Humidity sensor',
  //   },
  //   {
  //     name: 'Sensor 3',
  //     address_ip: '192.168.1.103',
  //     address_mac: '00:11:22:33:44:63',
  //     location: 'TDY C',
  //     model: 'Model Z',
  //     type: 'Type C',
  //     measurement_unit: 'Lux',
  //     Thresholds_min: 10,
  //     Thresholds_max: 1000,
  //     sensor_manufacturer: 'Manufacturer C',
  //     installation_date: '2023-03-10',
  //     last_maintenance_date: '2024-03-28',
  //     description: 'Light intensity sensor',
  //   },
  //   {
  //     name: 'Sensor 4',
  //     address_ip: '192.168.1.104',
  //     address_mac: '00:11:22:33:44:64',
  //     location: 'TDY D',
  //     model: 'Model A',
  //     type: 'Type D',
  //     measurement_unit: 'PPM',
  //     Thresholds_min: 0,
  //     Thresholds_max: 1000,
  //     sensor_manufacturer: 'Manufacturer D',
  //     installation_date: '2023-04-05',
  //     last_maintenance_date: '2024-04-01',
  //     description: 'Air quality sensor',
  //   },
  //   {
  //     name: 'Sensor 5',
  //     address_ip: '192.168.1.105',
  //     address_mac: '00:11:22:33:44:65',
  //     location: 'TDY E',
  //     model: 'Model B',
  //     type: 'Type E',
  //     measurement_unit: 'dB',
  //     Thresholds_min: 20,
  //     Thresholds_max: 120,
  //     sensor_manufacturer: 'Manufacturer E',
  //     installation_date: '2023-05-20',
  //     last_maintenance_date: '2024-03-15',
  //     description: 'Noise level sensor',
  //   },
  //   {
  //     name: 'Sensor 6',
  //     address_ip: '192.168.1.106',
  //     address_mac: '00:11:22:33:44:66',
  //     location: 'TDY F',
  //     model: 'Model C',
  //     type: 'Type F',
  //     measurement_unit: 'Hz',
  //     Thresholds_min: 50,
  //     Thresholds_max: 60,
  //     sensor_manufacturer: 'Manufacturer F',
  //     installation_date: '2023-06-10',
  //     last_maintenance_date: '2024-04-05',
  //     description: 'Frequency sensor',
  //   },
  //   {
  //     name: 'Sensor 7',
  //     address_ip: '192.168.1.107',
  //     address_mac: '00:11:22:33:44:67',
  //     location: 'TDY G',
  //     model: 'Model D',
  //     type: 'Type G',
  //     measurement_unit: 'kg',
  //     Thresholds_min: 0,
  //     Thresholds_max: 500,
  //     sensor_manufacturer: 'Manufacturer G',
  //     installation_date: '2023-07-15',
  //     last_maintenance_date: '2024-03-10',
  //     description: 'Weight sensor',
  //   },
  //   {
  //     name: 'Sensor 8',
  //     address_ip: '192.168.1.108',
  //     address_mac: '00:11:22:33:44:68',
  //     location: 'TDY H',
  //     model: 'Model E',
  //     type: 'Type H',
  //     measurement_unit: 'm/s²',
  //     Thresholds_min: 0,
  //     Thresholds_max: 20,
  //     sensor_manufacturer: 'Manufacturer H',
  //     installation_date: '2023-08-20',
  //     last_maintenance_date: '2024-04-15',
  //     description: 'Acceleration sensor',
  //   },
  //   {
  //     name: 'Sensor 9',
  //     address_ip: '192.168.1.109',
  //     address_mac: '00:11:22:33:44:69',
  //     location: 'TDY I',
  //     model: 'Model F',
  //     type: 'Type I',
  //     measurement_unit: 'W',
  //     Thresholds_min: 0,
  //     Thresholds_max: 1000,
  //     sensor_manufacturer: 'Manufacturer I',
  //     installation_date: '2023-09-25',
  //     last_maintenance_date: '2024-03-20',
  //     description: 'Power consumption sensor',
  //   },
  //   {
  //     name: 'Sensor 10',
  //     address_ip: '192.168.1.110',
  //     address_mac: '00:11:22:33:44:70',
  //     location: 'TDY J',
  //     model: 'Model G',
  //     type: 'Type J',
  //     measurement_unit: 'bar',
  //     Thresholds_min: 0,
  //     Thresholds_max: 10,
  //     sensor_manufacturer: 'Manufacturer J',
  //     installation_date: '2023-10-30',
  //     last_maintenance_date: '2024-04-25',
  //     description: 'Pressure sensor',
  //   },
  //   {
  //     name: 'Sensor 11',
  //     address_ip: '192.168.1.111',
  //     address_mac: '00:11:22:33:44:71',
  //     location: 'TDY K',
  //     model: 'Model H',
  //     type: 'Type K',
  //     measurement_unit: 'Lux',
  //     Thresholds_min: 0,
  //     Thresholds_max: 1000,
  //     sensor_manufacturer: 'Manufacturer K',
  //     installation_date: '2023-11-15',
  //     last_maintenance_date: '2024-03-10',
  //     description: 'Ambient light sensor',
  //   },
  //   {
  //     name: 'Sensor 12',
  //     address_ip: '192.168.1.112',
  //     address_mac: '00:11:22:33:44:72',
  //     location: 'TDY L',
  //     model: 'Model I',
  //     type: 'Type L',
  //     measurement_unit: 'kg/m³',
  //     Thresholds_min: 0,
  //     Thresholds_max: 1000,
  //     sensor_manufacturer: 'Manufacturer L',
  //     installation_date: '2023-12-20',
  //     last_maintenance_date: '2024-04-15',
  //     description: 'Density sensor',
  //   },

  // ])
};
