export function clearLocalStorage() {
  localStorage.setItem('userId', '');
  localStorage.setItem('doctorRole', '');
  localStorage.setItem('username', '');
}

export function changeLanguage(language) {
  if (language === 'en') {
    localStorage.setItem('language', 'cn');
  } else {
    localStorage.setItem('language', 'en');
  }
  window.location.reload();
}