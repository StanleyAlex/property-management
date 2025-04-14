import mongoose from 'mongoose';

let connected = false;

const connectDB = async() => {
    mongoose.set('strictQuery', true);

    if (connected) {
        console.log('Mongo DB is connected!');
        return;
    }

    if (!connected) {
        try {
            await mongoose.connect(process.env.MONGODB_URI as string);
            console.log('Successfully connected to Mongo DB');
            connected = true;
        } catch (error) {
            console.log('Could not connect to Mongo DB', error);
        }
    }
}

export default connectDB;