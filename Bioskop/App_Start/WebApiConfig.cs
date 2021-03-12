using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Bioskop.Interface;
using Bioskop.Repository;
using Bioskop.Resolver;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Unity;
using Unity.Lifetime;

namespace Bioskop
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var container = new UnityContainer();
            container.RegisterType<IFilmoviRepository, FilmoviRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IKarteRepository, KarteRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IKorisnikRepository, KorisnikRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IProjekcijeRepository, ProjekcijeRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISalaRepository, SalaRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISedistaRepository, SedistaRepository>(new HierarchicalLifetimeManager());



            config.DependencyResolver = new UnityResolver(container);










        }
    }
}
