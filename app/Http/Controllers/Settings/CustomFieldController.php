<?php
namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\CustomField;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomFieldController extends Controller
{
    public function index()
    {
        $fields = CustomField::all();
        return Inertia::render('settings/CustomFields', [
            'customFields' => $fields,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:text,number,date,select',
            'required' => 'boolean',
            'options' => 'nullable|string',
        ]);
        if ($data['type'] === 'select') {
            $data['options'] = array_map('trim', explode(',', $data['options'] ?? ''));
        } else {
            $data['options'] = null;
        }
        CustomField::create($data);
        return redirect()->route('settings.custom-fields.index');
    }

    public function update(Request $request, CustomField $customField)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:text,number,date,select',
            'required' => 'boolean',
            'options' => 'nullable|string',
        ]);
        if ($data['type'] === 'select') {
            $data['options'] = array_map('trim', explode(',', $data['options'] ?? ''));
        } else {
            $data['options'] = null;
        }
        $customField->update($data);
        return redirect()->route('settings.custom-fields.index');
    }

    public function destroy(CustomField $customField)
    {
        $customField->delete();
        return redirect()->route('settings.custom-fields.index');
    }
}
