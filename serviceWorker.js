var cacheName = 'petstore-v1';
var cacheFiles = ['index.html',
'product.js',
'petstore.webmanifest',
'images/cat.jpg',
'images/icon-icon.jpg'

];

self.addEventListener('install',(e) =>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        cache.open(cacheName).then((cache) =>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('Fetch', function (e){
//     e.respondWith(
//         caches.match(e.request).then(function(r) {
//             console.log('[Service Worker]Fetching resource:'
//             + e.request,url);

//             return r
//         })
//     );
// });

self.addEventListener('fetch', function (e) { 
     e.respondWith(   
         caches.match(e.request).then(function (r) {
            // Download the file if it is not in the cache,
             return r || fetch(e.request).then(function (response) {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache) { 
                             cache.put(e.request, response.clone());
                             return response;  
                                  });   
                                
                                });  
                              }) 
                               );
                            });