"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5475],{1537:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>p});var n=r(4848),i=r(8453);const s={},o=void 0,a={id:"jh/securityconfig/securityconfig",title:"securityconfig",description:"",source:"@site/docs/jh/securityconfig/securityconfig.md",sourceDirName:"jh/securityconfig",slug:"/jh/securityconfig/",permalink:"/doc/docs/jh/securityconfig/",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/jh/securityconfig/securityconfig.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"mapper",permalink:"/doc/docs/jh/mapper/"},next:{title:"mac",permalink:"/doc/docs/mac/"}},c={},p=[];function m(e){const t={code:"code",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:'package com.mycompany.myapp.config;\n\nimport static org.springframework.security.config.Customizer.withDefaults;\n\nimport com.mycompany.myapp.security.*;\nimport com.mycompany.myapp.web.filter.SpaWebFilter;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.http.HttpMethod;\nimport org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;\nimport org.springframework.security.config.annotation.web.builders.HttpSecurity;\nimport org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;\nimport org.springframework.security.config.http.SessionCreationPolicy;\nimport org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;\nimport org.springframework.security.crypto.password.PasswordEncoder;\nimport org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;\nimport org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;\nimport org.springframework.security.web.SecurityFilterChain;\nimport org.springframework.security.web.authentication.www.BasicAuthenticationFilter;\nimport org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;\nimport org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;\nimport org.springframework.web.servlet.handler.HandlerMappingIntrospector;\nimport tech.jhipster.config.JHipsterProperties;\n\n@Configuration\n@EnableMethodSecurity(securedEnabled = true)\npublic class SecurityConfiguration {\n\n    private final JHipsterProperties jHipsterProperties;\n\n    public SecurityConfiguration(JHipsterProperties jHipsterProperties) {\n        this.jHipsterProperties = jHipsterProperties;\n    }\n\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();\n    }\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http, MvcRequestMatcher.Builder mvc) throws Exception {\n        http\n            .cors(withDefaults())\n            .csrf(csrf -> csrf.disable())\n            .addFilterAfter(new SpaWebFilter(), BasicAuthenticationFilter.class)\n            .headers(\n                headers ->\n                    headers\n                        .contentSecurityPolicy(csp -> csp.policyDirectives(jHipsterProperties.getSecurity().getContentSecurityPolicy()))\n                        .frameOptions(FrameOptionsConfig::sameOrigin)\n                        .referrerPolicy(\n                            referrer -> referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)\n                        )\n                        .permissionsPolicy(\n                            permissions ->\n                                permissions.policy(\n                                    "camera=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), sync-xhr=()"\n                                )\n                        )\n            )\n            .authorizeHttpRequests(\n                authz ->\n                    // prettier-ignore\n                authz\n                    .requestMatchers(mvc.pattern("/index.html"), mvc.pattern("/*.js"), mvc.pattern("/*.txt"), mvc.pattern("/*.json"), mvc.pattern("/*.map"), mvc.pattern("/*.css")).permitAll()\n                    .requestMatchers(mvc.pattern("/*.ico"), mvc.pattern("/*.png"), mvc.pattern("/*.svg"), mvc.pattern("/*.webapp")).permitAll()\n                    .requestMatchers(mvc.pattern("/app/**")).permitAll()\n                    .requestMatchers(mvc.pattern("/i18n/**")).permitAll()\n                    .requestMatchers(mvc.pattern("/content/**")).permitAll()\n                    .requestMatchers(mvc.pattern("/swagger-ui/**")).permitAll()\n                    .requestMatchers(mvc.pattern(HttpMethod.POST, "/api/authenticate")).permitAll()\n                    .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/authenticate")).permitAll()\n                    .requestMatchers(mvc.pattern("/api/categories/categories-with-posts")).permitAll()\n                    .requestMatchers(mvc.pattern("/api/register")).permitAll()\n                    .requestMatchers(mvc.pattern("/api/activate")).permitAll()\n                    .requestMatchers(mvc.pattern("/api/account/reset-password/init")).permitAll()\n                    .requestMatchers(mvc.pattern("/api/account/reset-password/finish")).permitAll()\n                    .requestMatchers(mvc.pattern("/api/admin/**")).hasAuthority(AuthoritiesConstants.ADMIN)\n                    .requestMatchers(mvc.pattern("/api/**")).authenticated()\n                    .requestMatchers(mvc.pattern("/v3/api-docs/**")).hasAuthority(AuthoritiesConstants.ADMIN)\n                    .requestMatchers(mvc.pattern("/management/health")).permitAll()\n                    .requestMatchers(mvc.pattern("/management/health/**")).permitAll()\n                    .requestMatchers(mvc.pattern("/management/info")).permitAll()\n                    .requestMatchers(mvc.pattern("/management/prometheus")).permitAll()\n                    .requestMatchers(mvc.pattern("/management/**")).hasAuthority(AuthoritiesConstants.ADMIN)\n            )\n            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .exceptionHandling(\n                exceptions ->\n                    exceptions\n                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())\n                        .accessDeniedHandler(new BearerTokenAccessDeniedHandler())\n            )\n            .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults()));\n        return http.build();\n    }\n\n    @Bean\n    MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {\n        return new MvcRequestMatcher.Builder(introspector);\n    }\n}\n'})})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},8453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>a});var n=r(6540);const i={},s=n.createContext(i);function o(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);