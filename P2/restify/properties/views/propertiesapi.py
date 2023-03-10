from rest_framework.response import Response
from rest_framework.decorators import api_view

# function-based view
@api_view(['GET'])
def test_message(request):
    return Response({"message":"hello it works!"})