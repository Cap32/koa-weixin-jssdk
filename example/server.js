
import Koa from 'koa';
import weixinJSSDK from '../src';
import outputHost from 'output-host';

const port = process.env.PORT || 3000;
const app = new Koa();

let weixinConfig = {};
const configFile = 'config.json';

try {
	weixinConfig = require(`./${configFile}`);
}
catch (err) {
	const configFileExample = {
		appId: '<YOUR_APP_ID>',
		secret: '<YOUR_SECRET>',
	};

	console.error(
		`你需要先在 \`${__dirname}\` 目录创建 \`${configFile}\` 文件，格式如下：`
	);

	console.error(JSON.stringify(configFileExample, null, 2));

	process.exit(1);
}

app.use(weixinJSSDK(weixinConfig));

app.listen(port, () => outputHost({
	port,
	useCopy: false,
}));
