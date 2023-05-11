# Marketplace project

Es un proyecto que cuenta con una API escrita en Typescript y express en su mayoría junto y un frontend escrito en vue todo de la mano con NodeJS.


## Requerimientos

* Docker
* Un sistema basado en linux (de preferencia).


## Instalación

Para la instalación basta con descargar el proyecto.

```bash
git clone https://github.com/gouh/marketplace-api.git
```

Posterior ejecutar el comando

```bash
docker compose up -d --build
```

## Consideraciones

* El sistema toma en cuenta los puertos 3001 y 8080 los cuales son modificables en el archivo env explícitamente las variables

```bash
API_PORT=3001
WEB_PORT=8080
```

## Adjuntos
Se adjunta una collection de postman donde se encuentran los endpoints de la api, la url de la api es http://ec2-18-204-205-61.compute-1.amazonaws.com:3001/api/v1 y puedes ver su status en http://ec2-18-204-205-61.compute-1.amazonaws.com:3001/api/v1/health

El nombre de la collection es marketplace-api.json, importante destacar que los token solo duran 1 hora.


## DEMO
* Se puede ver una demo en la siguiente url: http://ec2-18-204-205-61.compute-1.amazonaws.com es http sin "s"

* Como primera pantalla veremos la lista de productos de los cuales se puede hacer un filtrado con diferentes parámetros como Nombre, sku, precio minimo, precio maximo y vendedor. Todo esto sin la necesidad de estar loggeados.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/055915ee-4c9f-4f65-a205-ac7145c91780)

* También se puede ver que ya se encuentra un usuario registrado este es el "admin", con este usuario realizaremos algunos movimientos
  * usuario:admin@admin.com
  * password:123456
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/a7526365-eef4-474b-958d-6ad1e12102ac)

* Al dar click en inventario nos solicita que ingresemos nuestras credenciales
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/c09509e9-5a4d-4feb-8d48-91061b818883)

* Ingresamos las credenciales previamente mencionadas y ahora podemos ver el inventario, se puede ver que se habilitó un botón verde
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/54ffc34e-1cb0-4884-a4e3-be2e3ca79d7b)

* Al dar click en dicho botón se nos permitirá agregar un nuevo producto
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/b5665860-863f-4cda-885f-8cda2ae0a8e9)
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/cc806783-4b76-4c47-aeb1-9e665687c855)

* En caso de que falte algún campo el formulario lo mostrará.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/eb809769-cf4d-4043-9d45-9180ad0d6f24)

* Al finalizar el registro se nos mostrará una nueva fila en la tabla
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/24dfb01b-6240-4ec4-8e27-3b6b8c2b2170)

* Este producto se puede actualizar o eliminar, al dar click en actualizar nos muestra un formulario de nuevo pero ahora con la información del producto.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/223dd1aa-eff8-45b2-8d5b-bd679c256157)

* Al actualizar algún dato de dicho producto esto se ve reflejado en la tabla.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/4a01737d-bcbc-4cc8-82d4-3593db9baffa)

* Saldremos de dicho usuario administrador y volveremos a ver el sitio como publico en general.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/e01b9851-e391-4bc9-83c5-ac7ff69a3bde)
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/cfb4ba02-7ceb-4ffc-a8b6-73f92c0c175b)

* Al ver como público en general podemos observar que todas nuestras opciones para modificar dichos ítems se fueron.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/9d34ea6f-fbfc-46a1-bb8c-22751e7b4960)

* Nos registramos como un nuevo usuario dando click en la opción "Soy nuevo quiero registrarme"
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/648df0a0-4e26-4d54-b5b8-d860ae565373)

* En caso de que ingresemos contraseñas erróneas el registro nos lo hará saber de igual manera con el email en caso de que ya haya sido utilizado o sea erróneo.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/80cd6b84-59ab-4e3b-8f5d-61759f220bd7)

* En este caso nos registramos de nuevo entonces ya que no somos administrador podremos ver un poco distinto el panel de inventario
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/b566ca12-1f6f-423d-9a34-30b5634cbfed)

Como podemos ver no es posible previsualizar ningún otro item en este panel que no sea nuestro, los filtros por vendedor desaparecieron
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/ce83c329-cc1b-4cf9-a614-8ba97f1b36d5)

Al registrar un producto únicamente podremos previsualizar dicho producto
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/7e8b6cbe-dc1b-46fe-86fa-456dab095c8a)

* Sin embargo en la lista de marketplace se pueden visualizar todos los demás
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/2544370c-135c-4470-8eb6-8f3246b41ddf)

* Se agregaron otros productos mas para probar filtros
  * filtro de precio
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/544ae087-99e9-49c6-b908-634c2c6152a5)

  * filtro de nombre
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/5bf997e3-43d8-4654-adf9-a6c84bf538e5)

  * filtro por sku
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/2ca7bd8c-7ab8-4d25-90c0-796741b48c2f)

  * filtro por vendedor
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/251c5479-83e7-4ef2-8847-8c8b35dc9d87)
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/312b5760-e4d9-4876-bb1f-6b43af8e929d)

* Volvimos a ingresar como administrador, a diferencia de un usuario que no es administrador podemos visualizar que el administrador puede filtrar para administrar los productos de los demás usuarios así como eliminar o actualizar dichos productos.
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/60071fc1-f489-4072-abd7-cc6408502e7a)

* Se hizo una prueba con el "Sofá Rojo" ahora será Azul y costará 10000
 ![imagen](https://github.com/gouh/marketplace-api/assets/13145599/95f42c05-3bbf-43fe-b026-275349697cc6)

* Ahora lo eliminaremos
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/342e70b6-9455-46aa-a865-bf3d908f323a)
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/c3d5beca-8d8b-4688-92b5-081a48c447aa)

* Agregamos un par de productos para validar que la paginación funciona correctamente
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/5f6809e8-37a8-4a87-b55e-b9be55bc4672)
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/6f752794-1439-4014-8b61-c52932266deb)

* Filtramos una vez más
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/4a661bf5-bb0f-465f-a517-ed15461fa119)
![imagen](https://github.com/gouh/marketplace-api/assets/13145599/3c226321-ae26-4cfc-9ce4-e16d44558929)









