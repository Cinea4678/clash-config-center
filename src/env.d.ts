// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        /** 访问接口的auth */
        AUTH: string;

        /** 远程配置下载地址 */
        REMOTE_CONFIG: string;

        /** XZVPN密码 */
        XZVPN_PASSWORD: string;
    }
}