import React,{useState} from 'react';


const Settings = ({settinopen, setNews, setNotice}) => {
    const [localNews, setLocalNews] = useState('');
    const [localNotice, setLocalNotice] = useState('');

    if (!settinopen) {
        return null;
    }
    
    const settingsOptions = [
        { option: 'Profile Settings', description: 'Update your personal information and preferences.' },
        { option: 'Notification Settings', description: 'Manage your notification preferences.' },
        { option: 'Privacy Settings', description: 'Control your privacy and data sharing options.' },
        { option: 'Account Settings', description: 'Change your account details and password.' },
    ];
    
    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <ul className="settings-list">
                {settingsOptions.map((setting, index) => (
                    <li key={index} className="settings-item">
                        <h3 className="setting-option">{setting.option}</h3>
                        <p className="setting-description">{setting.description}</p>
                    </li>
                ))}

            </ul>
            <div className="Shamida News">
                <textarea type="multi-text" value={localNews} onChange={(e) => setLocalNews(e.target.value)} placeholder="Enter your update..." className="update-input" />
                <button className="update-button" onClick={() => setNews(localNews)}>Post news</button>
            </div>
            <div className="Shamida Notices">
                <textarea type="multi-text" value={localNotice} onChange={(e) => setLocalNotice(e.target.value)} placeholder="Enter your notice..." className="update-input" />
                <button className="update-button" onClick={() => setNotice(localNotice)}>Post Notice</button>
            </div>
        </div>
    );
}
export default Settings;