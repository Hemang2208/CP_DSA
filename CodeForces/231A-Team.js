// https://codeforces.com/problemset/problem/231/A

const fs = require('fs');
 
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
 
let index = 0, attempt = 0;
const t = input[index++];

for( let i = 1 ; i <= t ; i++ ) {
  let count = 0;
  
  for( let j = 1 ; j <= 3 ; j++ ) {
    const n = input[index++];
    
    if( n > 0 ) {
      count++;
    }
  }

  if( count >= 2 ) {
    attempt++;
  }
}

console.log(attempt);