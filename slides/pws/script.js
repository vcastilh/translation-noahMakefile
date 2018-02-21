const web3 = new Web3(new Web3.providers.HttpProvider('http://95.85.1.235:8545'));

Reveal.initialize({
  history: true,
  backgroundTransition: 'slide'
})

function addToSlide(data, isHeader) {
  const pre = document.createElement('pre');
  if (isHeader) {
    pre.classList.add('header');
  }
  pre.textContent = data;

  document.querySelector('#blockchain').appendChild(pre);
}

function compactStr(str) {
  return str.substr(0, 10) + '...' + str.substr(str.length - 10);
}

// addToSlide('012345678901234567890123456789012345678901234567890123456789')

// Listen for incoming blocks.
const filter = web3.eth.filter('latest');
filter.watch((err, blockHash) => {
  // New block created
  if (err) {
    throw err;
  }

  const block = web3.eth.getBlock(blockHash, true);
  console.log(block);
  addToSlide(`Block ${block.number}`, true);

  block.transactions.forEach((transaction) => {
    if (transaction.from == null || transaction.to == null) {
      return;
    }

    const humanReadableValue = web3.fromWei(transaction.value, 'ether').toString();
    addToSlide(`${compactStr(transaction.from)} -> ${humanReadableValue} ETHER -> ${compactStr(transaction.to)}`);
  });
});
