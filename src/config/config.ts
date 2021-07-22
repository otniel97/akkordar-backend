import dotenv = require('dotenv');
dotenv.config();

export function getEnviromentConfig(MODE:string){

    if(!MODE)
        throw new Error(`MODE is missing`)

    let config = {};

    switch(MODE){

        case 'DEVELOPMENT':     
            config = Object.assign({
                "PORT": "3000",
                "MYSQL_HOST": process.env.DATABASE_DEV_HOST,
                "MYSQL_PORT": process.env.DATABASE_DEV_PORT,
                "MYSQL_USER": process.env.DATABASE_USERNAME,
                "MYSQL_PASSWORD": process.env.DATABASE_PASSWORD,
                "MYSQL_DATABASE": process.env.DATABASE_DEV_NAME,
            })
            break; 

        case 'TEST': 
            config = Object.assign({
                "PORT": "8080",
                "MYSQL_HOST": "",
                "MYSQL_PORT": "",
                "MYSQL_USER": "",
                "MYSQL_PASSWORD": "",
                "MYSQL_DATABASE": "",
            })
            break;

            case 'PRODUCTION': 
            config = Object.assign({
                "PORT": "8080",
                "MYSQL_HOST": "",
                "MYSQL_PORT": "",
                "MYSQL_USER": "",
                "MYSQL_PASSWORD": "",
                "MYSQL_DATABASE": "",
            })
            break;
        
        default: 
            config = Object.assign({
                "PORT": "8080",
                "MYSQL_HOST": "localhost",
                "MYSQL_PORT": "5432",
                "MYSQL_USER": "postgres",
                "MYSQL_PASSWORD": "postgres",
                "MYSQL_DATABASE": "postgres",
            })

    }

    return config;

}