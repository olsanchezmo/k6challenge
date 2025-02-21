import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1,
    iterations: 100,
    thresholds: 
    { 
        'http_req_duration': ['p(95)<200'],
    },
}

export default function() {
    let response = http.get('https://test-api.k6.io/public/crocodiles/');

    check(response, {
        'Dummy API status is 200': (r) => r.status === 200,
        'Response time < 200': (r) => r.timings.duration < 200,
        }
    );

    console.log( `Status ${response.status}: Duration ${response.timings.duration}`);

    sleep(1);
}