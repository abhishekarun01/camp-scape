const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/campScape')

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            owner: '665adac5749376e7c8f879eb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            image: "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto quas quidem suscipit fuga! Facere cupiditate eaque perferendis vel ut animi repudiandae pariatur beatae rem! Ea, est. Repudiandae iusto repellendus alias!',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dyhzgkf3p/image/upload/v1717687801/CampScape/u6uukhnvt37zpojpwvsp.webp',
                    filename: 'CampScape/u6uukhnvt37zpojpwvsp'
                },
                {
                    url: 'https://res.cloudinary.com/dyhzgkf3p/image/upload/v1717687802/CampScape/lrfruwnkw58arvptnbxi.jpg',
                    filename: 'CampScape/lrfruwnkw58arvptnbxi'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})