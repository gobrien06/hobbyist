var geohash = require('ngeohash');

function degreeToRad(deg) {
    return Math.PI * deg / 180;
}

function getDistance(user1, user2) {
  var dLat = degreeToRad(user2.lat-user1.lat);  // deg2rad below
  var dLon = degreeToRad(user2.lon-user1.lon); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degreeToRad(user1.lat)) * Math.cos(degreeToRad(user2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;  
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

class GeohashMap {
    
    constructor() {
        this.geoMap = new Map();
        this.add = this.add.bind(this);
        this.pruneOld = this.pruneOld.bind(this);
    }
    
    add(user) {
        let hash = geohash.encode(user.lat, user.lon);
        console.log(this.geoMap.get(hash));
        let map = this.geoMap.get(hash);
        if(map) {
            map.set(user.username, user);
        } else {
            let map = new Map();
            map.set(user.username, user);
            this.geoMap.set(hash,  map);            
        }
        let nearby = [];
        let neighbors = [hash, ...geohash.neighbors(hash)];
        
        let currTime = Date.now();
        for(const neighbor of neighbors) {
            let nearUsers = this.geoMap.get(neighbor);
            if(nearUsers) {
                let keys = nearUsers.keys();
                let key = keys.next();
                while(!key.done) {
                    console.log(key.value);
                    if(currTime - nearUsers.get(key.value).timestamp > 15000) {
                        nearUsers.delete(key.value);
                        console.log('culled');
                    } else {
                        console.log('else');
                        if(user.username == key.value) {
                            key = keys.next();
                            continue;
                        }
                        if(getDistance(user, nearUsers.get(key.value)) < 1) {
                            console.log('pushed');
                            nearby.push(nearUsers.get(key.value));
                        }
                    }    
                    key = keys.next();
                }
            }
        }
        return nearby;
    }
    
    pruneOld() {
        //todo later
        //prune all old every so and so
    }
}

var geohashmap = new GeohashMap();
module.exports = geohashmap;