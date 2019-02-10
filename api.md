# API

{% api-method method="get" host="http://rng.gudin.io" path="/data/cakes/:id" %}
{% api-method-summary %}
Obtener arreglo de números
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get free cakes.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="x" type="number" required=false %}
Semilla. Número mayor a 0
{% endapi-method-parameter %}

{% api-method-parameter name="a" type="number" required=false %}
Multiplicador. Número mayor a 0
{% endapi-method-parameter %}

{% api-method-parameter name="c" type="number" required=false %}
Constante aditiva. Número mayor a 0
{% endapi-method-parameter %}

{% api-method-parameter name="m" type="number" required=false %}
Módulo. Número mayor a la semilla, mayor al multiplicador y mayor a la constante aditiva
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-query-parameters %}
{% api-method-parameter name="recipe" type="string" %}
The API will do its best to find a cake matching the provided recipe.
{% endapi-method-parameter %}

{% api-method-parameter name="gluten" type="boolean" %}
Whether the cake should be gluten-free or not.
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Datos enviados correctamente.
{% endapi-method-response-example-description %}

```javascript
{
    "data": []
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find a cake matching this query.
{% endapi-method-response-example-description %}

```javascript
{
    "message": "Ain't no cake like that."
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



