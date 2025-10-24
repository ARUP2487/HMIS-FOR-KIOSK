import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    phone: '',
    email: '',
    language_preference: 'en'
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { t, language, changeLanguage } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
        toast.success(t('loginSuccess'));
      } else {
        await register(formData);
        toast.success(t('registerSuccess'));
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => changeLanguage('en')}
          data-testid="language-en-btn"
        >
          English
        </Button>
        <Button
          variant={language === 'bn' ? 'default' : 'outline'}
          size="sm"
          onClick={() => changeLanguage('bn')}
          data-testid="language-bn-btn"
        >
          
	    বাংলা 
        </Button>
      </div>
      
      <Card className=\"w-full max-w-md\" data-testid=\"auth-card\">
        <CardHeader>
          <CardTitle className=\"text-2xl\">{isLogin ? t('loginTitle') : t('registerTitle')}</CardTitle>
          <CardDescription>{t('appName')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('username')}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                data-testid="auth-username-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                data-testid="auth-password-input"
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="full_name">{t('fullName')}</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    data-testid="auth-fullname-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid=\"auth-phone-input\"
                 />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    data-testid="auth-email-input"
                  />
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full" disabled={loading} data-testid="auth-submit-btn">
              {loading ? '...' : isLogin ? t('login') : t('register')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline"
            data-testid="auth-toggle-btn"
          >
            {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;