from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()
		
class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = UserModel
        fields = ('email', 'username', 'password1', 'password2')

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        # Remove the password fields from validated_data and use them to create the user
        password = validated_data.pop('password1')
        validated_data.pop('password2')
        
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=password
        )
        return user
        
class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise serializers.ValidationError('user not found')
		return user
      
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username','is_customer')