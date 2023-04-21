class BaseConnector {
    async send() {
       throw new Error('Implement the method send method initially!');
    }
 
}

module.exports = BaseConnector;