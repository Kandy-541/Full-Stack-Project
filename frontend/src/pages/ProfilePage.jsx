import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProfilePage({ token, user, onProfileUpdate }) {
  const [profile, setProfile] = useState({ username: '', email: '', phone: '', avatarUrl: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordState, setPasswordState] = useState({ oldPassword: '', newPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load profile.');
      } finally {
        setLoading(false);
      }
    };

    if (token) loadProfile();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await axios.put(
        `${API}/users/me`,
        {
          username: profile.username,
          phone: profile.phone,
          avatarUrl: profile.avatarUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess('Profile updated successfully.');
      setProfile((current) => ({ ...current, ...response.data }));
      if (onProfileUpdate) {
        onProfileUpdate(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setPasswordSaving(true);

    try {
      await axios.put(
        `${API}/users/me/password`,
        {
          oldPassword: passwordState.oldPassword,
          newPassword: passwordState.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPasswordSuccess('Password updated successfully.');
      setPasswordState({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Unable to update password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Account Settings</h2>
          <p className="subtitle">Update your profile photo, phone number, and avatar link.</p>
        </div>
      </div>

      {loading ? (
        <p>Loading account details…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="grid">
          <form className="card" onSubmit={handleSubmit}>
            <h3>Profile details</h3>
            {success && <p className="success">{success}</p>}
            <label>
              Username
              <input name="username" value={profile.username} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" value={profile.email} readOnly />
            </label>
            <label>
              Phone number
              <input name="phone" value={profile.phone || ''} onChange={handleChange} />
            </label>
            <label>
              Avatar URL
              <input name="avatarUrl" value={profile.avatarUrl || ''} onChange={handleChange} placeholder="https://..." />
            </label>
            {profile.avatarUrl && (
              <div className="avatar-preview">
                <img src={profile.avatarUrl} alt="Avatar preview" />
              </div>
            )}
            <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</button>
          </form>

          <form className="card" onSubmit={handlePasswordChange}>
            <h3>Security settings</h3>
            {passwordError && <p className="error">{passwordError}</p>}
            {passwordSuccess && <p className="success">{passwordSuccess}</p>}
            <label>
              Current password
              <input
                type="password"
                name="oldPassword"
                value={passwordState.oldPassword}
                onChange={(e) => setPasswordState((current) => ({ ...current, oldPassword: e.target.value }))}
                required
              />
            </label>
            <label>
              New password
              <input
                type="password"
                name="newPassword"
                value={passwordState.newPassword}
                onChange={(e) => setPasswordState((current) => ({ ...current, newPassword: e.target.value }))}
                required
                minLength={6}
              />
            </label>
            <button type="submit" disabled={passwordSaving}>{passwordSaving ? 'Updating…' : 'Update password'}</button>
          </form>
        </div>
      )}
    </section>
  );
}
