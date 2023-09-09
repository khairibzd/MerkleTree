const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Create a Merkle tree for the nice list
  const merkleTree = new MerkleTree(niceList);

  const Name = 'khairi';

  // Find the index of your name in the nice list
  const index = niceList.findIndex(name => name === Name);

  if (index === -1) {
    console.log(`Sorry, ${Name} is not on the nice list.`);
    return;
  }

  // Get the Merkle proof for your name
  const proof = merkleTree.getProof(index);
  

  try {
    // Make a request to the server to claim your gift
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: Name,
      proof: proof,
    });

    console.log({ gift });
  } catch (error) {
    console.error('Error claiming the gift:', error.message);
  }
}

main();
