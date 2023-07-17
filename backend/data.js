import bcrypt from 'bcryptjs'
const data = {
  users:[
     {
          name:'Shivam',
          email:'shivamsingh226@gmail.com',
          password:bcrypt.hashSync('123456'),
          isAdmin:true,
     },
     {
          name:'Mcandles',
          email:'shivamsingh65@yahoo.com',
          password:bcrypt.hashSync('1234567'),
          isAdmin:false,
     }
  ],
  products: [
    {
     


      name: 'Nike Slim Shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: '/images/p1.jpg', //670*829px
      price: 3000,
      countInStock: 120,
      brand: 'Nike',
      rating: 4.8,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
     
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: '/images/p2.jpg', //670*829px
      price: 2500,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'high quality shirt',
    },
    {
     
      name: 'Nike Fit Pant',
      slug: 'nike-fit-pant',
      category: 'Pants',
      image: '/images/p3.jpg', //670*829px
      price: 3000,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.8,
      numReviews: 10,
      description: 'high quality product',
    },
    {
     
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image: '/images/p4.jpg', //670*829px
      price: 2600,
      countInStock: 5,
      brand: 'Adidas',
      rating: 4.4,
      numReviews: 12,
      description: 'high quality product',
    },
  ],
};
export default data;
