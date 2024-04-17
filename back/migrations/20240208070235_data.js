exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("data_collected", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid("sensor").references("id").inTable("sensors");
        table.uuid("gateway").references("id").inTable("gateways");
        table.double('measurement', 10, 2);
        table.decimal('measurement_accuracy', 10, 2);
        table.string('unit');
        table.string('data_quality');
        table.string('transmission_protocol');
        table.string('status');
        table.decimal('battery_level', 5, 2);
        table.integer('signal_strength');
        table.decimal('latitude', 9, 6);
        table.decimal('longitude', 9, 6);
        table.decimal('altitude', 10, 6);
        table.json('sensor_configuration');  // JSON format for flexibility in storing configuration data
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("notifications", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid("data_collected").references("id").inTable("data_collected");
        table.uuid("sensor").references("id").inTable("sensors");
        table.uuid("gateway").references("id").inTable("gateways");
        table.decimal('measurement', 10, 2);
        table.decimal('measurement_accuracy', 10, 2);
        table.string('notification_type', 50); // Type of notification (e.g., email, SMS)
        table.text('notification_message'); // Content of the notification
        table.timestamp('notification_timestamp').defaultTo(knex.fn.now()); // Timestamp when the notification was generated
        table.string('notification_status', 20); // Status of the notification (e.g., pending, sent, read)
        table.string('event_type', 50); // Type of event or condition that triggered the notification
        table.timestamp('event_timestamp'); // Timestamp of the event or condition
        table.json('additional_data'); // Additional data related to the notification (stored in JSON format)
        table.json('sensor_configuration');  // JSON format for flexibility in storing configuration data
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
    );
};

exports.down = function (knex) {
  return knex.schema.dropTable('Users');
};
