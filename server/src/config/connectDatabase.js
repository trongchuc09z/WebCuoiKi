const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DB_NAME,        // tên database
    process.env.DB_USERNAME,    // user, ví dụ: root
    process.env.DB_PASSWORD || '', // nếu không có password thì để chuỗi rỗng
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3307, // ⬅ MySQL trong XAMPP đang chạy port 3307
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
        // dialectOptions: {
        //     ssl: {
        //         require: true, // This will help you. But you will see new error
        //         rejectUnauthorized: false // This line will fix new error
        //     }
        // },
    }
);

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectDatabase;
