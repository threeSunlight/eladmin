import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n' +
  '2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ=='

// 加密
export function encrypt(txt: string) {
  // 实例化当前对象
  const encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(publicKey) // 设置公钥

  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

