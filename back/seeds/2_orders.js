/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('orders').insert([
    {
      ref: 'ORD001',
      categorie: 'Electronics',
      description: 'Smartphone',
      prix_unitaire: 599.99,
      quantite: 2,
      type: 'Online',
      note: 'Black color preferred',
      status:'Updated'
    },
    {
      ref: 'ORD002',
      categorie: 'Clothing',
      description: 'T-shirt',
      prix_unitaire: 19.99,
      quantite: 5,
      type: 'In-store',
      note: 'Size: Medium',
      status:'Updated'
    },
    {
      ref: 'ORD003',
      categorie: 'Books',
      description: 'Programming Guide',
      prix_unitaire: 49.99,
      quantite: 1,
      type: 'Online',
      note: '',
      status:'Updated'
    },
    {
      ref: 'ORD004',
      categorie: 'Home Appliances',
      description: 'Microwave Oven',
      prix_unitaire: 129.99,
      quantite: 1,
      type: 'Online',
      note: '',
      status:'Updated'
    },
    {
      ref: 'ORD005',
      categorie: 'Sports Equipment',
      description: 'Yoga Mat',
      prix_unitaire: 29.99,
      quantite: 3,
      type: 'In-store',
      note: 'Color: Blue',
      status:'Updated'
    },
    {
      ref: 'ORD006',
      categorie: 'Groceries',
      description: 'Fresh Vegetables',
      prix_unitaire: 15.50,
      quantite: 2,
      type: 'In-store',
      note: '',
      status:'Updated'
    },
    {
      ref: 'ORD007',
      categorie: 'Electronics',
      description: 'Wireless Headphones',
      prix_unitaire: 99.99,
      quantite: 1,
      type: 'Online',
      note: '',
      status:'Updated'
    },
    {
      ref: 'ORD008',
      categorie: 'Beauty',
      description: 'Perfume',
      prix_unitaire: 79.99,
      quantite: 1,
      type: 'In-store',
      note: 'Brand: XYZ',
      status:'Updated'
    },
    {
      ref: 'ORD009',
      categorie: 'Home Decor',
      description: 'Throw Pillow',
      prix_unitaire: 25.00,
      quantite: 4,
      type: 'Online',
      note: 'Color: Red',
      status:'Updated'
    },
    {
      ref: 'ORD010',
      categorie: 'Toys',
      description: 'Action Figure',
      prix_unitaire: 39.99,
      quantite: 2,
      type: 'Online',
      note: 'Character: Spiderman',
      status:'Updated'
    }
  ])

};
