const options = {
    port: {
        option: '-p, --port<v>',
        description: 'Port to use [8080]',
        usage: 'sam-server --port 3000'
    },
    address: {
        option: '-a <v>',
        description: 'Address to use [8080]',
        usage: 'sam-server -a 127.0.0.1'
    },
    directory: {
        option: '-d <v>',
        description: 'Show directory listings [true]',
        usage: 'sam-server --d D:'
    }
};

module.exports = options;