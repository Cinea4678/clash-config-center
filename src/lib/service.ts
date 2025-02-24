import * as Yaml from 'js-yaml'
import { promises as fs } from 'fs';

export async function GetRemote() {
    const data = await fetch(process.env.REMOTE_CONFIG);
    const text = await data.text()
    const yaml = Yaml.load(text)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return yaml as any
}

export async function GetLocal() {
    console.log(process.cwd())
    const data = await fs.readFile(process.cwd() + '/public/local_config.yml', 'utf8')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yaml = Yaml.load(data) as any

    // 填充密码
    yaml.proxies[0].password = process.env.XZVPN_PASSWORD

    return yaml
}

export async function GetConfig() {
    const [remote, local] = await Promise.all([GetRemote(), GetLocal()])
    remote.proxies = remote.proxies.concat(local.proxies)
    remote.rules = local.rules.concat(remote.rules)

    return Yaml.dump(remote)
}

