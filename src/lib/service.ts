import * as Yaml from 'js-yaml'
import localConfig from './local_config.yml'

export async function GetRemote() {
    const data = await fetch(process.env.REMOTE_CONFIG, {
        next: { revalidate: 3600 * 6 }, 
    });
    const text = await data.text()
    const yaml = Yaml.load(text)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return yaml as any
}

export async function GetLocal() {
    const text = localConfig
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const yaml = Yaml.load(text) as any

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

