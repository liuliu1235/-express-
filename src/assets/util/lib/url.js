const env=process.env.NODE_ENV  //判断模式
/**
 * @development 本地开发模式
 * @production  服务器生产模式
 */

const development='http://localhost:3000/' //本地
const production='http://localhost:3000/' //服务器
const serveUrl = env==='development'?development:production //服务器默认路径，
export default serveUrl