exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("privilege", function (table) {
        table.string("privilege").unique();
        table.string("description");
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("users", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("name");
        table.string("lastname");
        table.string("username").unique();
        table.string("description");
        table.string("privilege");
        table.string("functions");
        table.integer("status").defaultTo(0);
        table.string("email").unique();  // Exemple d'un champ email unique
        table.string("password");  // Exemple d'un champ pour stocker le mot de passe
        table.string("phone_number");  // Exemple d'un champ pour le numéro de téléphone
        table.date("birthdate");  // Exemple d'un champ pour la date de naissance
        table.boolean("is_admin").defaultTo(false);  // Exemple d'un champ pour indiquer si l'utilisateur est un administrateur
        table.timestamp("last_login");  // Exemple d'un champ pour enregistrer la dernière connexion
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("organization_gen_info", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("name");
        table.string("level").unique();
        table.string("description");
        table.string("functions");
        table.integer("status").defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      ///L'gateways
      .createTable("gateways", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name');
        table.string('address_ip');
        table.string('address_mac');
        table.string('location');
        table.string('model');
        table.string('type');
        table.string('Gateway_manufacturer');
        table.string('installation_date');
        table.string('last_maintenance_date');
        table.text('description');
        table.enum('status', ['Active', 'Inactive', 'Error', 'Maintenance']).defaultTo('Inactive');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      // La sensors
      .createTable("sensors", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name');
        table.string('address_ip');
        table.string('address_mac');
        table.string('location');
        table.string('model');
        table.string('type');
        table.string('measurement_unit');
        table.integer('Thresholds_min');
        table.integer('Thresholds_max');
        table.string('sensor_manufacturer');
        table.string('installation_date');
        table.string('last_maintenance_date');
        table.text('description');
        table.enum('status', ['Active', 'Inactive', 'Error', 'Maintenance']).defaultTo('Inactive');
        table.uuid("gateways").nullable().references("id").inTable("gateways");
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable("orders", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("ref").unique();
        table.string('categorie');
        table.string('description');
        table.decimal('prix_unitaire', 10, 2);
        table.integer('quantite');
        table.string("type");
        table.string("note");
        table.uuid("gateways").references("id").inTable("gateways");
        table.enum('status', ['en cours', 'Updated', 'Error', 'Maintenance']).defaultTo('Inactive');
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
    );
};

exports.down = function (knex) {
  return knex.schema.dropTable('Users');
};
