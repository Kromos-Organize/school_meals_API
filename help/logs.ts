import {Request} from "express";

const fs = require('fs');
const moment = require('moment');

export function logsDB(error: Error, fileName: string, method: string) {
    console.log(error)
    fileHandlerError(error, fileName, method, 'mongo.log');
}

export function logs(error: Error, filename:string, method: string) {
    console.log(error)
    fileHandlerError(error, filename, method, 'logs.log');
}

function fileHandlerError(error:Error, fileName: string, method: string, nameFileLogs: string) {

    const now = moment().format('DD-MM-YYYY HH:mm:SS');

    const dirDate = moment().format('DD-MM-YYYY');

    if (!fs.existsSync(`logs/${dirDate}`)) {
        fs.mkdir(`logs/${dirDate}`, {recursive: true}, (err: Error) => {
            if (err) throw err;
        });
    }

    if (error) {
        fs.readFile(`./logs/${dirDate}/${nameFileLogs}`, 'utf-8', (err:Error) => {
            if (err) {
                fs.open(`./logs/${dirDate}/${nameFileLogs}`, 'r+', (err: string) => {
                    if (err) console.log(err)
                })
            }

            const message = `\n[${now}]\nError: ${error.message} -- File: ${fileName} -- Method: ${method}\n`

            fs.appendFile(`logs/${dirDate}/${nameFileLogs}`, message, (err: Error) => {
                if (err) throw err;
            })
        })
    }
}

export function queryLogs(req: Request) {

    const now = moment().format('DD-MM-YYYY HH:mm:SS');

    const dirDate = moment().format('DD-MM-YYYY');

    if (!fs.existsSync(`logs/${dirDate}`)) {
        fs.mkdir(`logs/${dirDate}`, {recursive: true}, (err: Error) => {
            if (err) throw err;
        });
    }

    fs.readFile(`./logs/${dirDate}/query_logs.log`, 'utf-8', (err:Error) => {
        if (err) {
            fs.open(`./logs/${dirDate}/query_logs.log`, 'r+', (err: string) => {
                if (err) console.log(err)
            })
        }

        const message = `\n[${now}]\nMethod: ${req.method} -- Path: ${req.url} -- Params ${JSON.stringify(req.params)}\nQuery ${JSON.stringify(req.query)}\nBody ${JSON.stringify(req.body)}\nCookies ${JSON.stringify(req.cookies)}\n`

        fs.appendFile(`logs/${dirDate}/query_logs.log`, message, (err: Error) => {
            if (err) throw err;
        })
    })
}

